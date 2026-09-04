import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 96,
          background: "#0b0e14",
          color: "#f3f5f7",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 24,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#f2a93b",
            fontFamily: "monospace",
          }}
        >
          {profile.heroKicker}
        </div>
        <div style={{ display: "flex", fontSize: 72, fontWeight: 700, marginTop: 24 }}>{profile.name}</div>
        <div style={{ display: "flex", fontSize: 32, color: "#8b93a3", marginTop: 20, maxWidth: 900 }}>
          {profile.positioning}
        </div>
      </div>
    ),
    size,
  );
}
