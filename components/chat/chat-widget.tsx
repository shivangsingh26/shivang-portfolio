"use client";

import { useState, useRef, useEffect } from "react";
import { useChat } from "@ai-sdk/react";
import { motion, AnimatePresence } from "motion/react";
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  Loader2,
  Copy,
  Check,
  RotateCcw,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { profile } from "@/lib/data";
import { cn } from "@/lib/utils";
import { track } from "@/lib/telemetry";

const SUGGESTIONS = [
  "What's your most impressive production system?",
  "Walk me through Bodhi Atomize.",
  "Why should I hire you?",
  "What's Dossier about?",
];

const FOLLOWUPS: Record<string, string[]> = {
  default: [
    "What's the hardest production bug you fixed?",
    "What are you learning right now?",
    "What's next for you?",
  ],
};

function MessageMarkdown({ text }: { text: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        p: ({ children }) => <p className="my-1.5 first:mt-0 last:mb-0">{children}</p>,
        ul: ({ children }) => <ul className="my-2 ml-4 list-disc space-y-1 marker:text-[var(--primary)]">{children}</ul>,
        ol: ({ children }) => <ol className="my-2 ml-4 list-decimal space-y-1 marker:text-[var(--primary)]">{children}</ol>,
        li: ({ children }) => <li>{children}</li>,
        strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
        em: ({ children }) => <em className="italic">{children}</em>,
        a: ({ href, children }) => (
          <a
            href={href}
            target="_blank"
            rel="noreferrer"
            className="border-b border-[var(--primary)]/40 text-[var(--primary)]"
          >
            {children}
          </a>
        ),
        code: ({ children, className }) => {
          const isBlock = className?.startsWith("language-");
          if (isBlock) {
            return (
              <code className="my-2 block overflow-x-auto rounded-lg border border-border bg-[oklch(0.07_0_0)] p-2.5 font-mono text-[12px] leading-relaxed text-foreground">
                {children}
              </code>
            );
          }
          return (
            <code className="rounded border border-border bg-background/60 px-1 py-0.5 font-mono text-[0.9em] text-foreground">
              {children}
            </code>
          );
        },
        pre: ({ children }) => <>{children}</>,
        blockquote: ({ children }) => (
          <blockquote className="my-2 border-l-2 border-[var(--primary)] pl-3 italic text-foreground/80">
            {children}
          </blockquote>
        ),
      }}
    >
      {text}
    </ReactMarkdown>
  );
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setCopied(true);
          setTimeout(() => setCopied(false), 1400);
        } catch {}
      }}
      className="grid h-6 w-6 place-items-center rounded-md text-muted-foreground transition hover:bg-foreground/10 hover:text-foreground"
      aria-label="Copy message"
    >
      {copied ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
    </button>
  );
}

export function ChatWidget({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const [input, setInput] = useState("");
  const { messages, sendMessage, status, error, setMessages } = useChat({
    onError: () => {},
  });
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, status]);

  const submit = (text: string) => {
    const t = text.trim();
    if (!t || status === "streaming") return;
    track("chat_message", { length: t.length });
    sendMessage({ text: t });
    setInput("");
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submit(input);
  };

  const lastMessage = messages[messages.length - 1];
  const showFollowups =
    lastMessage?.role === "assistant" && status !== "streaming" && messages.length > 0;

  return (
    <>
      <button
        type="button"
        onClick={() => {
          if (!open) track("chat_open", { source: "fab" });
          onOpenChange(!open);
        }}
        aria-label="Open chat with Shivang's AI"
        data-cursor="hover"
        className="group fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center overflow-hidden rounded-full border border-border bg-foreground text-background shadow-[0_8px_30px_rgba(0,0,0,0.5)] transition hover:scale-105 sm:bottom-6 sm:right-6"
      >
        <span className="absolute inset-0 -z-10 bg-gradient-to-tr from-[var(--violet)] via-[var(--primary)] to-[var(--coral)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span
              key="x"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <X className="h-5 w-5" />
            </motion.span>
          ) : (
            <motion.span
              key="msg"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              className="relative"
            >
              <MessageSquare className="h-5 w-5" />
              <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-emerald-400 ring-2 ring-foreground" />
            </motion.span>
          )}
        </AnimatePresence>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-24 right-4 z-50 flex h-[min(680px,82vh)] w-[min(440px,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-border bg-background/95 shadow-[0_24px_60px_rgba(0,0,0,0.6)] backdrop-blur-xl sm:right-6"
          >
            <div className="relative flex items-center justify-between border-b border-border p-4">
              <div
                aria-hidden
                className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--primary)]/60 to-transparent"
              />
              <div className="flex items-center gap-3">
                <div className="relative grid h-8 w-8 place-items-center overflow-hidden rounded-full bg-gradient-to-tr from-[var(--violet)] via-[var(--primary)] to-[var(--coral)]">
                  <Sparkles className="h-4 w-4 text-background" />
                </div>
                <div>
                  <div className="text-sm font-semibold">Ask {profile.firstName}&apos;s AI</div>
                  <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    grounded on resume
                  </div>
                </div>
              </div>
              <button
                onClick={() => setMessages([])}
                className="inline-flex items-center gap-1 rounded-md px-2 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground transition hover:text-foreground"
                aria-label="Reset chat"
              >
                <RotateCcw className="h-3 w-3" /> reset
              </button>
            </div>

            <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto p-4">
              {messages.length === 0 && (
                <div className="space-y-4">
                  <div className="rounded-xl border border-border bg-card/40 p-4 text-sm leading-relaxed text-muted-foreground">
                    Hey — I&apos;m {profile.firstName}&apos;s AI, trained on his resume. Ask about
                    his production GenAI work, side projects, or what he&apos;d build for you.
                  </div>
                  <div className="space-y-2">
                    {SUGGESTIONS.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => submit(s)}
                        className="group w-full rounded-lg border border-border bg-card/30 px-3 py-2 text-left text-xs text-muted-foreground transition hover:border-[var(--primary)]/40 hover:text-foreground"
                      >
                        <span className="mr-2 font-mono text-[var(--primary)]">›</span>
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((m) => {
                const text = m.parts
                  .map((part) => (part.type === "text" ? part.text : ""))
                  .join("");
                return (
                  <div
                    key={m.id}
                    className={cn("group/msg flex gap-2", m.role === "user" ? "justify-end" : "justify-start")}
                  >
                    {m.role !== "user" && (
                      <div className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-gradient-to-tr from-[var(--violet)] via-[var(--primary)] to-[var(--coral)]">
                        <Sparkles className="h-3 w-3 text-background" />
                      </div>
                    )}
                    <div className="max-w-[85%]">
                      <div
                        className={cn(
                          "rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
                          m.role === "user"
                            ? "bg-foreground text-background"
                            : "border border-border bg-card/60 text-foreground"
                        )}
                      >
                        {m.role === "assistant" ? <MessageMarkdown text={text} /> : <span className="whitespace-pre-wrap">{text}</span>}
                      </div>
                      {m.role === "assistant" && text && (
                        <div className="mt-1 flex justify-end opacity-0 transition-opacity group-hover/msg:opacity-100">
                          <CopyButton text={text} />
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}

              {status === "streaming" && messages[messages.length - 1]?.role === "user" && (
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  thinking…
                </div>
              )}

              {showFollowups && (
                <div className="space-y-2 pt-2">
                  <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                    Suggested follow-ups
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {FOLLOWUPS.default.map((q) => (
                      <button
                        key={q}
                        type="button"
                        onClick={() => submit(q)}
                        className="rounded-full border border-border bg-card/40 px-3 py-1.5 text-xs text-muted-foreground transition hover:border-[var(--primary)]/40 hover:text-foreground"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {error && (
                <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-3 text-xs text-amber-200">
                  Chat is not wired up. Set <code className="font-mono">ANTHROPIC_API_KEY</code> or
                  <code className="font-mono"> OPENAI_API_KEY</code> in <code className="font-mono">.env</code>.
                </div>
              )}
            </div>

            <form onSubmit={onSubmit} className="border-t border-border p-3">
              <div className="flex items-center gap-2 rounded-xl border border-border bg-background/60 p-1 pl-3 transition focus-within:border-[var(--primary)]/60">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={`Ask ${profile.firstName} anything…`}
                  className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground/70"
                  disabled={status === "streaming"}
                  autoFocus
                />
                <button
                  type="submit"
                  disabled={!input.trim() || status === "streaming"}
                  className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-foreground text-background transition disabled:opacity-40 enabled:hover:bg-[var(--primary)] enabled:hover:text-primary-foreground"
                  aria-label="Send"
                >
                  {status === "streaming" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                </button>
              </div>
              <p className="mt-1.5 px-1 font-mono text-[10px] text-muted-foreground/70">
                Markdown + streaming · grounded on resume
              </p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
