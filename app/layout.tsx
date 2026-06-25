import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LenisProvider } from "@/components/providers/lenis-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ScrollProgress } from "@/components/effects/scroll-progress";
import { QuickDock } from "@/components/effects/quick-dock";
import { StatusBanner } from "@/components/effects/status-banner";
import { ResumeModal } from "@/components/resume-modal";
import { PageTransition } from "@/components/page-transition";
import { ChatRoot } from "@/components/chat/chat-root";
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
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FAFAF8" },
    { media: "(prefers-color-scheme: dark)", color: "#16161B" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans bg-background text-foreground antialiased">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <StatusBanner />
          <ScrollProgress />
          <LenisProvider>
            <PageTransition>{children}</PageTransition>
          </LenisProvider>
          <ChatRoot />
          <QuickDock />
          <ResumeModal />
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
