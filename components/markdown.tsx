import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { ReactNode } from "react";

function slugify(s: string): string {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function getText(children: ReactNode): string {
  if (typeof children === "string") return children;
  if (typeof children === "number") return String(children);
  if (Array.isArray(children)) return children.map(getText).join("");
  if (children && typeof children === "object" && "props" in children) {
    const props = (children as { props?: { children?: ReactNode } }).props;
    return props?.children ? getText(props.children) : "";
  }
  return "";
}

/**
 * Server-rendered markdown for blog posts.
 * Auto-assigns id slugs to headings so TOC can link.
 */
export function Markdown({ content }: { content: string }) {
  return (
    <div className="text-pretty text-base leading-[1.75] text-muted-foreground sm:text-[17px]">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h1 id={slugify(getText(children))} className="mb-6 mt-12 scroll-mt-28 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 id={slugify(getText(children))} className="mb-5 mt-12 scroll-mt-28 font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 id={slugify(getText(children))} className="mb-4 mt-10 scroll-mt-28 font-display text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
              {children}
            </h3>
          ),
          p: ({ children }) => <p className="my-5">{children}</p>,
          ul: ({ children }) => <ul className="my-5 ml-5 list-disc space-y-2 marker:text-[var(--primary)]">{children}</ul>,
          ol: ({ children }) => <ol className="my-5 ml-5 list-decimal space-y-2 marker:text-[var(--primary)]">{children}</ol>,
          li: ({ children }) => <li className="pl-2">{children}</li>,
          blockquote: ({ children }) => (
            <blockquote className="my-6 border-l-2 border-[var(--primary)] bg-card/40 py-3 pl-5 pr-4 italic text-foreground/90">
              {children}
            </blockquote>
          ),
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noreferrer"
              className="border-b border-[var(--primary)]/40 text-[var(--primary)] transition hover:border-[var(--primary)]"
            >
              {children}
            </a>
          ),
          code: ({ children, className }) => {
            const isBlock = className?.startsWith("language-");
            if (isBlock) {
              return (
                <code className="block overflow-x-auto rounded-xl border border-border bg-[oklch(0.08_0_0)] p-4 font-mono text-sm leading-relaxed text-foreground">
                  {children}
                </code>
              );
            }
            return (
              <code className="rounded-md border border-border bg-card/60 px-1.5 py-0.5 font-mono text-[0.92em] text-foreground">
                {children}
              </code>
            );
          },
          pre: ({ children }) => <pre className="my-6">{children}</pre>,
          hr: () => <hr className="my-12 border-border" />,
          strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
          em: ({ children }) => <em className="text-foreground/90">{children}</em>,
          table: ({ children }) => (
            <div className="my-6 overflow-x-auto rounded-xl border border-border">
              <table className="w-full text-sm">{children}</table>
            </div>
          ),
          th: ({ children }) => (
            <th className="border-b border-border bg-card/60 px-4 py-2 text-left font-semibold text-foreground">
              {children}
            </th>
          ),
          td: ({ children }) => <td className="border-b border-border/40 px-4 py-2">{children}</td>,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
