import { ImageResponse } from "next/og";
import { business } from "@/lib/business";

export const alt = `${business.name} — Catering & Deli in West Boylston, MA`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Branded OG card — warm paper, espresso text, single clay accent (on-brand).
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#FAF8F3",
          padding: 80,
          fontFamily: "serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <span style={{ fontSize: 40, fontWeight: 700, color: "#211C17" }}>
            TEE&rsquo;s
          </span>
          <span
            style={{
              fontSize: 22,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "#6B645B",
            }}
          >
            Deli &amp; Catering
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 84,
              lineHeight: 1.02,
              fontWeight: 600,
              color: "#211C17",
              letterSpacing: -2,
            }}
          >
            Catering that makes
          </div>
          <div
            style={{
              display: "flex",
              gap: 20,
              fontSize: 84,
              lineHeight: 1.02,
              fontWeight: 600,
              color: "#211C17",
              letterSpacing: -2,
            }}
          >
            <span>you look</span>
            <span style={{ color: "#B5543B" }}>good.</span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 26,
            color: "#6B645B",
          }}
        >
          <span>West Boylston, MA · Greater Worcester</span>
          <span style={{ color: "#B5543B", fontWeight: 600 }}>
            {business.phone.display}
          </span>
        </div>
      </div>
    ),
    { ...size },
  );
}
