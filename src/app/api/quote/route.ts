/**
 * Quote form submissions → an email to Tom.
 *
 * Sends through Resend's REST API (no SDK — it's one POST, and a dependency
 * for that isn't worth the install). If GHL_QUOTE_WEBHOOK_URL is also set the
 * submission is forwarded there too, so the form can feed a CRM later without
 * touching this file.
 *
 * The form POSTs here rather than at Resend directly so the API key stays on
 * the server. This is an unauthenticated endpoint that accepts whatever is
 * posted to it; anything secret in the browser gets scraped.
 *
 * Required in Netlify:
 *   RESEND_API_KEY    — from resend.com
 *   QUOTE_EMAIL_FROM  — an address on a domain verified in Resend
 * Optional:
 *   QUOTE_EMAIL_TO           — defaults to the owner's address below
 *   GHL_QUOTE_WEBHOOK_URL    — also forward to a GHL inbound webhook
 */

import { business } from "@/lib/business";

type QuotePayload = {
  name: string;
  contact: string;
  eventDate: string;
  headcount: string;
  type: string;
  notes: string;
};

const MAX_LEN = 2000;

function clean(value: unknown): string {
  return typeof value === "string" ? value.trim().slice(0, MAX_LEN) : "";
}

/** Escapes user text before it goes into the HTML body of the email. */
function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Formats 2026-09-12 as "Saturday, 12 September 2026" for the subject line. */
function readableDate(iso: string): string {
  const d = new Date(`${iso}T12:00:00`);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function buildEmail(p: QuotePayload) {
  const when = readableDate(p.eventDate);
  // Date, headcount and type lead: they're what decides whether the job can be
  // taken, and they're what's visible in a phone's notification preview.
  const lines = [
    `${when} · ${p.headcount} people · ${p.type}`,
    "",
    `Name:        ${p.name}`,
    `Phone/email: ${p.contact}`,
    "",
    "Notes:",
    p.notes || "(none)",
    "",
    "— Sent by the quote form on the TEE's Deli website.",
  ];

  const html = `
<div style="font-family:system-ui,-apple-system,'Segoe UI',sans-serif;color:#211c17;line-height:1.6">
  <p style="font-size:18px;font-weight:600;margin:0 0 4px">${esc(when)}</p>
  <p style="font-size:16px;margin:0 0 20px;color:#6b645b">
    ${esc(p.headcount)} people &middot; ${esc(p.type)}
  </p>
  <table cellpadding="0" cellspacing="0" style="font-size:15px">
    <tr>
      <td style="padding:2px 16px 2px 0;color:#6b645b">Name</td>
      <td style="padding:2px 0"><strong>${esc(p.name)}</strong></td>
    </tr>
    <tr>
      <td style="padding:2px 16px 2px 0;color:#6b645b">Phone/email</td>
      <td style="padding:2px 0"><strong>${esc(p.contact)}</strong></td>
    </tr>
  </table>
  ${
    p.notes
      ? `<p style="margin:20px 0 0;font-size:15px"><span style="color:#6b645b">Notes</span><br>${esc(
          p.notes,
        ).replace(/\n/g, "<br>")}</p>`
      : ""
  }
  <p style="margin:24px 0 0;font-size:13px;color:#6b645b">
    Sent by the quote form on the TEE's Deli website.
  </p>
</div>`.trim();

  return {
    subject: `Catering quote — ${p.type}, ${when} (${p.headcount} people)`,
    text: lines.join("\n"),
    html,
  };
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Malformed request." }, { status: 400 });
  }

  // Honeypot. Real people never see this field, so anything in it is a bot.
  // Answer 200 so the bot believes it succeeded and doesn't come back varying
  // its payload — but send nothing.
  if (clean(body.website)) {
    return Response.json({ ok: true });
  }

  const payload: QuotePayload = {
    name: clean(body.name),
    contact: clean(body.contact),
    eventDate: clean(body.eventDate),
    headcount: clean(body.headcount),
    type: clean(body.type),
    notes: clean(body.notes),
  };

  // Re-checked server-side: the client validation is a courtesy to the visitor,
  // not a guarantee about what arrives here.
  const missing = (
    ["name", "contact", "eventDate", "headcount", "type"] as const
  ).filter((k) => !payload[k]);
  if (missing.length > 0) {
    return Response.json(
      { error: `Missing required fields: ${missing.join(", ")}.` },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.QUOTE_EMAIL_FROM;
  if (!apiKey || !from) {
    // Loud, not silent. A form that says "thanks" and drops the lead is worse
    // than one that admits it's broken and tells the visitor to call.
    console.error(
      "[quote] RESEND_API_KEY or QUOTE_EMAIL_FROM missing — not delivered:",
      payload,
    );
    return Response.json(
      { error: "Quote requests aren't being received right now." },
      { status: 503 },
    );
  }

  const { subject, text, html } = buildEmail(payload);
  const looksEmail = /\S+@\S+\.\S+/.test(payload.contact);

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [process.env.QUOTE_EMAIL_TO ?? business.email],
        subject,
        text,
        html,
        // So hitting reply goes to the customer — but only when they gave an
        // address. A phone number here would bounce.
        ...(looksEmail ? { reply_to: payload.contact } : {}),
      }),
      // Fail fast rather than leaving the visitor on a spinner.
      signal: AbortSignal.timeout(10_000),
    });

    if (!res.ok) {
      console.error(
        `[quote] Resend returned ${res.status}:`,
        await res.text().catch(() => ""),
      );
      return Response.json(
        { error: "We couldn't send that through." },
        { status: 502 },
      );
    }
  } catch (err) {
    console.error("[quote] Resend request failed:", err);
    return Response.json(
      { error: "We couldn't send that through." },
      { status: 502 },
    );
  }

  // Optional CRM copy. Deliberately after the email and never fatal — Tom
  // getting the lead is the thing that matters; a CRM sync failing shouldn't
  // tell the visitor their request didn't go through.
  const webhook = process.env.GHL_QUOTE_WEBHOOK_URL;
  if (webhook) {
    try {
      await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...payload,
          submittedAt: new Date().toISOString(),
          source: "teesdeli.com quote form",
        }),
        signal: AbortSignal.timeout(10_000),
      });
    } catch (err) {
      console.error("[quote] CRM webhook failed (email was sent):", err);
    }
  }

  return Response.json({ ok: true });
}
