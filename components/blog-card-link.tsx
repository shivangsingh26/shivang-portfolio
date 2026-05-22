"use client";

import Link from "next/link";
import { track } from "@/lib/telemetry";
import type { ReactNode } from "react";

export function BlogCardLink({
  href,
  slug,
  className,
  children,
}: {
  href: string;
  slug: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className={className}
      onClick={() => track("blog_open", { slug })}
      data-cursor="hover"
    >
      {children}
    </Link>
  );
}
