"use client";

import { motion } from "motion/react";
import { ArrowUpRight, Github, Linkedin, Mail, MapPin, FileDown } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { SplitTextSegmented } from "@/components/motion/split-text";
import { Magnetic } from "@/components/motion/magnetic";
import { profile } from "@/lib/data";
import { track } from "@/lib/telemetry";

const channels = [
  {
    label: "Email",
    value: profile.email,
    href: `mailto:${profile.email}`,
    icon: Mail,
  },
  {
    label: "LinkedIn",
    value: `/in/${profile.linkedin}`,
    href: `https://linkedin.com/in/${profile.linkedin}`,
    icon: Linkedin,
  },
  {
    label: "GitHub",
    value: `@${profile.github}`,
    href: `https://github.com/${profile.github}`,
    icon: Github,
  },
  {
    label: "Location",
    value: profile.location,
    href: "https://maps.google.com/?q=Bengaluru",
    icon: MapPin,
  },
];

export function Contact() {
  return (
    <section id="contact" className="relative w-full py-32 sm:py-44">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <Reveal>
          <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground">
            <span className="h-px w-8 bg-primary" />
            06 · Get in touch
          </div>
        </Reveal>

        <h2 className="mt-10 font-display text-balance text-[clamp(2.25rem,7vw,6rem)] font-semibold leading-[1.05] tracking-[-0.04em]">
          <SplitTextSegmented
            segments={[
              { text: "Let's build something" },
              { text: " that ships.", className: "gradient-text" },
            ]}
          />
        </h2>

        <Reveal delay={0.2}>
          <p className="mt-6 max-w-xl text-pretty text-lg text-muted-foreground">
            Open to conversations around GenAI systems, LLM infrastructure, ML engineering, and
            production AI challenges. Drop a line — I reply fast.
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Magnetic>
              <a
                href={`mailto:${profile.email}`}
                data-cursor="hover"
                onClick={() => track("cta_click", { target: "email", location: "contact" })}
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-foreground px-6 py-3.5 text-sm font-medium text-background transition"
              >
                <span className="absolute inset-0 -z-10 translate-y-full bg-gradient-to-tr from-primary to-glow transition-transform duration-500 group-hover:translate-y-0" />
                <Mail className="relative h-4 w-4" />
                <span className="relative group-hover:text-white">Say hello</span>
                <ArrowUpRight className="relative h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noreferrer"
                data-cursor="hover"
                download
                onClick={() => track("resume_download", { location: "contact" })}
                className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/40 px-6 py-3.5 text-sm font-medium backdrop-blur transition hover:border-primary/60 hover:text-primary"
              >
                <FileDown className="h-4 w-4" />
                Download resume
              </a>
            </Magnetic>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {channels.map((c, i) => (
            <motion.a
              key={c.label}
              href={c.href}
              target={c.href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              data-cursor="hover"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              whileHover={{ y: -3 }}
              onClick={() => track("social_click", { network: c.label.toLowerCase() })}
              className="group flex items-center justify-between rounded-xl border border-border/40 bg-card/40 p-4 backdrop-blur transition hover:border-primary/40"
            >
              <div className="flex min-w-0 items-center gap-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-border/60 bg-background/60 transition group-hover:border-primary/40 group-hover:text-primary">
                  <c.icon className="h-4 w-4" />
                </span>
                <div className="min-w-0">
                  <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                    {c.label}
                  </div>
                  <div className="truncate text-sm">{c.value}</div>
                </div>
              </div>
              <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" />
            </motion.a>
          ))}
        </div>

        <div className="mt-24 flex flex-col items-center justify-between gap-3 border-t border-border/40 pt-8 sm:flex-row">
          <div className="font-mono text-xs text-muted-foreground">
            © {new Date().getFullYear()} {profile.name}. Crafted with care.
          </div>
          <div className="font-mono text-xs text-muted-foreground">
            Next.js · Tailwind · Motion · R3F · AI SDK
          </div>
        </div>
      </div>
    </section>
  );
}
