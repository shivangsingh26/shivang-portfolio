import { readChatLog } from "@/lib/chat-log";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, MessageSquare, Calendar } from "lucide-react";

export const dynamic = "force-dynamic";

const ADMIN_TOKEN = process.env.ADMIN_TOKEN;

function isAuthed(token?: string): boolean {
  if (!ADMIN_TOKEN) return false; // not configured → 404
  if (!token) return false;
  return token === ADMIN_TOKEN;
}

type Search = { token?: string };

export default async function AdminStats({
  searchParams,
}: {
  searchParams: Promise<Search>;
}) {
  const sp = await searchParams;
  if (!isAuthed(sp.token)) notFound();

  const log = await readChatLog();
  const total = log.length;
  const last7d = log.filter(
    (e) => Date.now() - new Date(e.ts).getTime() < 7 * 24 * 60 * 60 * 1000
  ).length;
  const unique = new Set(log.map((e) => e.ip ?? "anon")).size;

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        home
      </Link>

      <h1 className="mt-8 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
        Admin · <span className="aurora-text">stats.</span>
      </h1>
      <p className="mt-3 text-muted-foreground">
        Chat questions log. Page views + custom events live in Vercel Analytics
        (vercel.com/[org]/[project]/analytics).
      </p>

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Stat label="Total questions" value={String(total)} accent="var(--primary)" />
        <Stat label="Last 7 days" value={String(last7d)} accent="var(--violet)" />
        <Stat label="Unique visitors" value={String(unique)} accent="var(--coral)" />
      </div>

      <div className="mt-12">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-2xl font-semibold tracking-tight">
            <MessageSquare className="mr-2 inline h-5 w-5 text-[var(--primary)]" />
            Recent questions
          </h2>
          <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            {total} total
          </div>
        </div>

        {log.length === 0 ? (
          <div className="mt-6 rounded-2xl border border-border bg-card/40 p-10 text-center text-muted-foreground">
            No questions yet. Open the chat widget and ask something.
          </div>
        ) : (
          <div className="mt-6 divide-y divide-border/60 rounded-2xl border border-border bg-card/40 backdrop-blur">
            {log.slice(0, 200).map((e, i) => (
              <div key={i} className="grid grid-cols-1 gap-2 p-4 sm:grid-cols-[1fr_auto]">
                <div>
                  <div className="text-sm leading-relaxed text-foreground">{e.question}</div>
                  <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                    {e.ip ?? "anon"} · {e.userAgent ? e.userAgent.split(" ")[0] : "—"}
                  </div>
                </div>
                <div className="inline-flex items-center gap-1.5 font-mono text-[11px] text-muted-foreground sm:justify-end">
                  <Calendar className="h-3 w-3" />
                  {new Date(e.ts).toLocaleString("en-IN", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-16 rounded-2xl border border-border bg-card/30 p-6 backdrop-blur">
        <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
          How tracking works
        </div>
        <ul className="mt-4 space-y-2 text-sm leading-relaxed text-muted-foreground">
          <li>
            <span className="text-foreground">Page views, sessions, referrers:</span> Vercel
            Analytics dashboard.
          </li>
          <li>
            <span className="text-foreground">Custom click events</span> (resume, blog, chat,
            CTAs, palette, social): also Vercel Analytics → Events tab.
          </li>
          <li>
            <span className="text-foreground">Web Vitals (LCP, INP, CLS):</span> Vercel Speed
            Insights tab.
          </li>
          <li>
            <span className="text-foreground">Chat questions:</span> shown above (filesystem on
            local dev). On Vercel production the FS is read-only — entries appear only in{" "}
            <code className="rounded border border-border bg-background/60 px-1 py-0.5 font-mono">
              vercel logs
            </code>{" "}
            (filter for{" "}
            <code className="rounded border border-border bg-background/60 px-1 py-0.5 font-mono">
              [chat]
            </code>
            ). For persistent prod storage, swap{" "}
            <code className="rounded border border-border bg-background/60 px-1 py-0.5 font-mono">
              lib/chat-log.ts
            </code>{" "}
            to Vercel KV.
          </li>
        </ul>
      </div>
    </main>
  );
}

function Stat({ label, value, accent }: { label: string; value: string; accent: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card/40 p-6 backdrop-blur">
      <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
        {label}
      </div>
      <div
        className="mt-3 font-display text-4xl font-semibold tracking-tight"
        style={{ color: accent }}
      >
        {value}
      </div>
    </div>
  );
}
