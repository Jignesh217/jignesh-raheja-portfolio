import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const runtime = "edge";
export const alt = `${siteConfig.name} — Full-Stack Developer & Product Builder`;
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
          background: "#ffffff",
          color: "#000000",
          padding: "56px",
          border: "18px solid #000000",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            fontSize: 26,
            fontWeight: 800,
            letterSpacing: 2,
          }}
        >
          <span>{siteConfig.name.toUpperCase()}</span>
          <span style={{ background: "#ff2d1a", color: "#fff", padding: "8px 18px" }}>
            AVAILABLE FOR WORK
          </span>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 110,
            fontWeight: 900,
            lineHeight: 0.92,
            letterSpacing: -3,
          }}
        >
          <span>I BUILD</span>
          <span>DIGITAL</span>
          <span style={{ color: "#ff2d1a" }}>PRODUCTS.</span>
        </div>

        <span style={{ fontSize: 28, fontWeight: 700, letterSpacing: 1 }}>
          {siteConfig.role.toUpperCase()}
        </span>
      </div>
    ),
    { ...size }
  );
}
