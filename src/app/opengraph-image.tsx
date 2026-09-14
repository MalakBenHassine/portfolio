import { ImageResponse } from "next/og";
import { pipelineStages } from "@/data/pipeline";
import { profile } from "@/data/profile";

export const alt = `${profile.name} — ${profile.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const NIGHT = "#0a0f26";
const MINT = "#34d399";

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
          padding: "72px 80px",
          backgroundColor: NIGHT,
          backgroundImage:
            "radial-gradient(circle at 85% 10%, rgba(52,211,153,0.22), transparent 45%), radial-gradient(circle at 10% 100%, rgba(99,102,241,0.25), transparent 50%)",
          color: "#f3f5fc",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 64,
              height: 64,
              borderRadius: 16,
              background: MINT,
              color: NIGHT,
              fontSize: 28,
              fontWeight: 800,
            }}
          >
            MB
          </div>
          <div style={{ display: "flex", fontSize: 26, color: "#9aa3c9" }}>
            Software Engineer · Full-Stack · Applied AI · DevOps
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 88, fontWeight: 800, letterSpacing: -2 }}>
            {profile.name}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 20,
              fontSize: 36,
              lineHeight: 1.35,
              color: "#d3d8ee",
              maxWidth: 960,
            }}
          >
            {profile.tagline}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            {pipelineStages.map((stage, index) => (
              <div key={stage.name} style={{ display: "flex", alignItems: "center" }}>
                <div
                  style={{
                    width: 26,
                    height: 26,
                    borderRadius: 13,
                    background: MINT,
                    boxShadow: "0 0 24px rgba(52,211,153,0.6)",
                  }}
                />
                {index < pipelineStages.length - 1 ? (
                  <div style={{ width: 38, height: 4, background: "rgba(52,211,153,0.55)" }} />
                ) : null}
              </div>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 34, fontWeight: 700 }}>
            <span style={{ color: "#7c86b2", textDecoration: "line-through" }}>3–5 days</span>
            <span style={{ color: "#7c86b2" }}>→</span>
            <span style={{ color: MINT }}>&lt; 10 min</span>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
