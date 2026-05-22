import { ImageResponse } from "next/og";
import { profile } from "@/lib/data";

export const runtime = "edge";

const size = { width: 1200, height: 630 };

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const title = (searchParams.get("title") ?? `${profile.firstName} ${profile.lastName}`).slice(0, 90);
  const subtitle =
    (searchParams.get("subtitle") ?? `${profile.role} · ${profile.company}`).slice(0, 100);
  const kind = searchParams.get("kind") ?? "default"; // "post" | "default"

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background: "#050505",
          fontFamily: '"Geist", system-ui, -apple-system, sans-serif',
          color: "#FAFAFA",
          position: "relative",
        }}
      >
        {/* Aurora blobs */}
        <div
          style={{
            position: "absolute",
            top: -120,
            left: -120,
            width: 700,
            height: 700,
            borderRadius: 9999,
            background: "radial-gradient(circle, #6366F1AA, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -180,
            right: -120,
            width: 700,
            height: 700,
            borderRadius: 9999,
            background: "radial-gradient(circle, #F472B6AA, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 100,
            right: -100,
            width: 500,
            height: 500,
            borderRadius: 9999,
            background: "radial-gradient(circle, #A78BFAAA, transparent 70%)",
            filter: "blur(50px)",
          }}
        />

        {/* Top: brand + kind chip */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div
              style={{
                width: 14,
                height: 14,
                borderRadius: 9999,
                background: "#6366F1",
                boxShadow: "0 0 24px #6366F1",
              }}
            />
            <span style={{ fontSize: 28, fontWeight: 600, letterSpacing: "-0.02em" }}>
              shivangsingh.dev
            </span>
          </div>
          {kind === "post" ? (
            <div
              style={{
                fontSize: 18,
                padding: "8px 16px",
                borderRadius: 999,
                border: "1px solid #FFFFFF20",
                background: "#FFFFFF10",
                fontFamily: "monospace",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#FAFAFAD0",
              }}
            >
              ✎ Blog
            </div>
          ) : (
            <div
              style={{
                fontSize: 18,
                padding: "8px 16px",
                borderRadius: 999,
                border: "1px solid #FFFFFF20",
                background: "#FFFFFF10",
                fontFamily: "monospace",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#FAFAFAD0",
              }}
            >
              · Portfolio
            </div>
          )}
        </div>

        {/* Middle: big title */}
        <div style={{ display: "flex", flexDirection: "column", zIndex: 1 }}>
          <span
            style={{
              fontSize: title.length > 60 ? 64 : 84,
              fontWeight: 600,
              lineHeight: 1.05,
              letterSpacing: "-0.04em",
              maxWidth: 1040,
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            {title}
          </span>
          <span
            style={{
              marginTop: 24,
              fontSize: 28,
              color: "#A3A3A3",
              maxWidth: 1040,
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            {subtitle}
          </span>
        </div>

        {/* Bottom: identity + meta */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            zIndex: 1,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: 9999,
                background: "linear-gradient(135deg, #6366F1, #A78BFA, #F472B6)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 24,
                fontWeight: 600,
                color: "#050505",
              }}
            >
              SS
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: 22, fontWeight: 600 }}>{profile.name}</span>
              <span style={{ fontSize: 18, color: "#A3A3A3" }}>{profile.location}</span>
            </div>
          </div>
          <div
            style={{
              fontSize: 18,
              fontFamily: "monospace",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#A3A3A3",
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <span style={{ width: 32, height: 1, background: "#FFFFFF40", display: "flex" }} />
            Production GenAI · LLM Infra
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      headers: {
        "cache-control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800",
      },
    }
  );
}
