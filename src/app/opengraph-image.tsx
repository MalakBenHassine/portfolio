import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";

export const alt = `${profile.name} — ${profile.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const INK = "#05060a";
const SNOW = "#f5f6fa";
const MIST = "#9499ab";
const AZURE = "#7c9dff";
const OK = "#4ade80";

/** Social preview card (LinkedIn, X, Slack…), rendered at build time. */
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
          padding: "70px 80px",
          backgroundColor: INK,
          backgroundImage:
            "radial-gradient(circle at 80% 0%, rgba(91,130,255,0.30), transparent 45%), radial-gradient(circle at 100% 100%, rgba(160,143,255,0.16), transparent 40%)",
          color: SNOW,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 60,
                height: 60,
                borderRadius: 16,
                border: `2px solid ${AZURE}`,
                fontSize: 24,
                color: SNOW,
              }}
            >
              MB
            </div>
            <div style={{ display: "flex", fontSize: 24, color: MIST }}>Portfolio</div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              fontSize: 22,
              color: MIST,
              padding: "10px 20px",
              borderRadius: 999,
              border: "1px solid rgba(255,255,255,0.12)",
            }}
          >
            <div style={{ width: 12, height: 12, borderRadius: 6, background: OK }} />
            {`${profile.availability} · ${profile.workRegions}`}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 96, letterSpacing: -4, lineHeight: 1 }}>{profile.name}</div>
          <div style={{ display: "flex", marginTop: 22, fontSize: 38, color: SNOW }}>
            {profile.title}
          </div>
          <div style={{ display: "flex", marginTop: 18, fontSize: 28, lineHeight: 1.4, color: MIST, maxWidth: 1000 }}>
            {profile.headline}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 26 }}>
          <span style={{ color: MIST }}>Capgemini Engineering · AnalyseImpacte</span>
          <span style={{ color: "#555b6e" }}>|</span>
          <span style={{ color: MIST, textDecoration: "line-through" }}>3–5 days</span>
          <span style={{ color: AZURE }}>→</span>
          <span style={{ color: SNOW }}>&lt; 10 min</span>
        </div>
      </div>
    ),
    size,
  );
}
