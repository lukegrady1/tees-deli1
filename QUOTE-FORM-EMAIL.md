# Quote form → email to Tom

The form on `/contact` and at the foot of every catering page POSTs to
`/api/quote`, which emails the submission to Tom through **Resend**.

The code is written and tested. What's left is a Resend account, two DNS
records, and two environment variables in Netlify. Budget about 15 minutes,
most of it waiting for DNS.

---

## 1. Resend

1. Sign up at [resend.com](https://resend.com). The free tier is 3,000
   emails/month — this form will use a handful.
2. **Domains → Add Domain →** `teesdeli.com`.
3. It gives you DNS records to add (a DKIM `TXT` and usually an SPF/`MX` pair
   for the sending subdomain). Add them wherever teesdeli.com's DNS lives, then
   press Verify. Propagation is usually minutes.
4. **API Keys → Create API Key**, sending permission only. Copy it — it's shown
   once.

**Why bother verifying a domain:** Tom's address is `@msn.com`, and Microsoft
is unforgiving toward unauthenticated senders. Mail from a verified
`teesdeli.com` lands in his inbox; mail from a generic shared sender is a coin
flip. This step is the whole reason to use Resend over a form-to-email widget.

---

## 2. Netlify

**Site configuration → Environment variables:**

| Key | Value |
|---|---|
| `RESEND_API_KEY` | the key from step 1 |
| `QUOTE_EMAIL_FROM` | `quotes@teesdeli.com` — must be on the verified domain |

Optional:

| Key | Default | Use when |
|---|---|---|
| `QUOTE_EMAIL_TO` | `teesdelimart@msn.com` | sending somewhere else, or to a second address while testing |
| `GHL_QUOTE_WEBHOOK_URL` | — | you later want a copy in GoHighLevel; set it and every submission is forwarded there too |

Redeploy after adding them.

---

## 3. Test

Submit the real form at `/contact`. You should get the thank-you screen, and
an email within a minute.

Then, once: **have Tom check his junk folder and mark it "not junk."** One
positive signal from the recipient does more for future deliverability than
anything else you can do. This is the most likely way the setup silently fails
— everything green, leads sitting unread in junk.

If the site shows "Something went wrong sending that" instead, check the
Netlify function log for a line starting `[quote]`.

---

## What the email looks like

**Subject:** `Catering quote — College team boxed lunches, Saturday, September 12, 2026 (40 people)`

```
Saturday, September 12, 2026 · 40 people · College team boxed lunches

Name:        Sarah Chen
Phone/email: schen@wpi.edu

Notes:
Two vegetarian, gluten-free bread for one.
Deliver 11:30 to the field house.

— Sent by the quote form on the TEE's Deli website.
```

Date, headcount and type lead the subject and the body because that's what
decides whether Tom can take the job, and it's what he'll see in a phone
notification without opening anything.

**Reply-to** is set to the customer's address when they gave an email, so Tom
can just hit reply. When they left a phone number instead it's omitted — a
reply-to that bounces is worse than none.

---

## Notes for whoever maintains this

- `src/app/api/quote/route.ts` — validation, the email, the optional CRM
  forward. No SDK; Resend is one `fetch`.
- `src/components/QuoteForm.tsx` — the form. Fields are validated client-side
  for the visitor's benefit and re-validated in the route, which trusts nothing.
- Rename or add a field and you must change both files together.
- With the env vars unset the route returns 503 and the form tells the visitor
  to call. It does **not** show the thank-you screen. A form that says "thanks"
  and drops the lead is worse than one that admits it's broken.
- A hidden honeypot field catches bots; those get a 200 and are silently
  dropped, so the bot doesn't retry with a different payload.
- No rate limiting yet. If it ever gets abused, that's the next thing to add.
