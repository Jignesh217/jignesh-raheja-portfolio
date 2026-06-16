import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const runtime = "edge";
export const alt = `${siteConfig.name} — An interactive experience`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#000000",
          padding: "72px",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "45%",
            left: "50%",
            width: 520,
            height: 520,
            marginLeft: -260,
            marginTop: -260,
            borderRadius: 999,
            background:
              "radial-gradient(circle, rgba(255,255,255,0.16), transparent 70%)",
          }}
        />
        <span style={{ color: "#888", fontSize: 26, letterSpacing: 4 }}>
          {siteConfig.name.toUpperCase()}
        </span>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ color: "#fff", fontSize: 82, fontStyle: "italic", lineHeight: 1.05 }}>
            Most websites are forgotten.
          </div>
          <div style={{ color: "#9a9a9a", fontSize: 82, fontStyle: "italic", lineHeight: 1.05 }}>
            Some become experiences.
          </div>
        </div>
        <span style={{ color: "#666", fontSize: 24, letterSpacing: 6 }}>
          AN INTERACTIVE EXPERIENCE
        </span>
      </div>
    ),
    { ...size }
  );
}
