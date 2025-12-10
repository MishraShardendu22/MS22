import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    <div
      style={{
        fontSize: 128,
        background: "linear-gradient(135deg, #000000 0%, #1a1a1a 100%)",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      {/* Gradient Orbs */}
      <div
        style={{
          position: "absolute",
          top: -50,
          left: -50,
          width: 400,
          height: 400,
          background:
            "radial-gradient(circle, rgba(6, 182, 212, 0.3) 0%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(60px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: -50,
          right: -50,
          width: 400,
          height: 400,
          background:
            "radial-gradient(circle, rgba(168, 85, 247, 0.3) 0%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(60px)",
        }}
      />

      {/* Content */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 10,
          padding: "40px",
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: "bold",
            background: "linear-gradient(90deg, #06b6d4 0%, #a855f7 100%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            color: "transparent",
            marginBottom: 20,
          }}
        >
          Shardendu Mishra
        </div>
        <div
          style={{
            fontSize: 36,
            color: "#9ca3af",
            textAlign: "center",
            maxWidth: "80%",
          }}
        >
          Software Developer & Engineer
        </div>
        <div
          style={{
            fontSize: 24,
            color: "#6b7280",
            marginTop: 20,
            textAlign: "center",
          }}
        >
          Go • React • Next.js • Cloud Native
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          position: "absolute",
          bottom: 40,
          fontSize: 20,
          color: "#4b5563",
        }}
      >
        mishrashardendu22.is-a.dev
      </div>
    </div>,
    {
      ...size,
    },
  );
}
