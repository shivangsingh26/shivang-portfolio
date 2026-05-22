import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LenisProvider } from "@/components/providers/lenis-provider";
import { Cursor } from "@/components/effects/cursor";
import { EasterEgg } from "@/components/effects/easter-egg";
import { ResumeModal } from "@/components/resume-modal";
import { PageTransition } from "@/components/page-transition";
import { profile } from "@/lib/data";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const geistSans = Geist({ subsets: ["latin"], variable: "--font-geist-sans", display: "swap" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" });

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://shivangsingh.dev";

const defaultOg = `/api/og?title=${encodeURIComponent(`${profile.firstName} ${profile.lastName}.`)}&subtitle=${encodeURIComponent(`${profile.role} · ${profile.company}`)}`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${profile.name} — ${profile.role}`,
    template: `%s · ${profile.firstName}`,
  },
  description: profile.summary,
  keywords: [
    "Shivang Singh",
    "AI Engineer",
    "GenAI",
    "LLM",
    "Production ML",
    "Publicis Sapient",
    "Bodhi Atomize",
    "Gemini",
    "FastAPI",
    "Kubernetes",
    "Computer Vision",
  ],
  authors: [{ name: profile.name, url: SITE_URL }],
  creator: profile.name,
  openGraph: {
    title: `${profile.name} — ${profile.role}`,
    description: profile.longTagline,
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: `${profile.name} · Portfolio`,
    images: [{ url: defaultOg, width: 1200, height: 630, alt: profile.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — ${profile.role}`,
    description: profile.longTagline,
    images: [defaultOg],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: SITE_URL, types: { "application/rss+xml": "/rss.xml" } },
};

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`dark ${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans bg-background text-foreground antialiased grain selection:bg-primary/30">
        <LenisProvider>
          <PageTransition>{children}</PageTransition>
        </LenisProvider>
        <Cursor />
        <ResumeModal />
        <EasterEgg />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
