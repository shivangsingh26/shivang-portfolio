// Server-only GitHub data. Cached via fetch revalidation. No token required
// (falls back to unauthenticated REST); uses GITHUB_TOKEN if present.

const USER = "shivangsingh26";
const BASE = "https://api.github.com";

function ghHeaders(): HeadersInit {
  const h: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "User-Agent": "shivang-portfolio",
  };
  const token = process.env.GITHUB_TOKEN;
  if (token) h.Authorization = `Bearer ${token}`;
  return h;
}

export type GhRepo = {
  name: string;
  description: string | null;
  stars: number;
  forks: number;
  language: string | null;
  url: string;
};

export type GhStats = {
  publicRepos: number;
  followers: number;
  totalStars: number;
  languages: { name: string; count: number }[];
  topRepos: GhRepo[];
};

type RawRepo = {
  name: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  html_url: string;
  fork: boolean;
  pushed_at: string;
};

export async function getGithubStats(): Promise<GhStats | null> {
  try {
    const [profileRes, reposRes] = await Promise.all([
      fetch(`${BASE}/users/${USER}`, {
        headers: ghHeaders(),
        next: { revalidate: 21600 },
        signal: AbortSignal.timeout(6000),
      }),
      fetch(`${BASE}/users/${USER}/repos?per_page=100&sort=pushed`, {
        headers: ghHeaders(),
        next: { revalidate: 21600 },
        signal: AbortSignal.timeout(6000),
      }),
    ]);
    if (!profileRes.ok || !reposRes.ok) return null;

    const profile = (await profileRes.json()) as { public_repos?: number; followers?: number };
    const repos = (await reposRes.json()) as RawRepo[];
    if (!Array.isArray(repos)) return null;

    const own = repos.filter((r) => !r.fork);
    const langCount = new Map<string, number>();
    let totalStars = 0;
    for (const r of own) {
      totalStars += r.stargazers_count;
      if (r.language) langCount.set(r.language, (langCount.get(r.language) ?? 0) + 1);
    }
    const languages = [...langCount.entries()]
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);

    const topRepos: GhRepo[] = [...own]
      .sort(
        (a, b) =>
          b.stargazers_count - a.stargazers_count ||
          new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime()
      )
      .slice(0, 6)
      .map((r) => ({
        name: r.name,
        description: r.description,
        stars: r.stargazers_count,
        forks: r.forks_count,
        language: r.language,
        url: r.html_url,
      }));

    return {
      publicRepos: profile.public_repos ?? own.length,
      followers: profile.followers ?? 0,
      totalStars,
      languages,
      topRepos,
    };
  } catch {
    return null;
  }
}

export type GhCell = { date: string; count: number } | null;
export type GhActivity = { weeks: GhCell[][]; total: number; max: number; days: number };

/**
 * Real recent activity heatmap built from public events (last ~90 days).
 * Self-rendered + theme-aware — no external image dependency.
 */
export async function getGithubActivity(): Promise<GhActivity | null> {
  try {
    const counts = new Map<string, number>();
    for (let page = 1; page <= 3; page++) {
      const res = await fetch(`${BASE}/users/${USER}/events/public?per_page=100&page=${page}`, {
        headers: ghHeaders(),
        next: { revalidate: 3600 },
        signal: AbortSignal.timeout(6000),
      });
      if (!res.ok) break;
      const events = (await res.json()) as { created_at?: string }[];
      if (!Array.isArray(events) || events.length === 0) break;
      for (const e of events) {
        const d = (e.created_at ?? "").slice(0, 10);
        if (d) counts.set(d, (counts.get(d) ?? 0) + 1);
      }
      if (events.length < 100) break;
    }

    const DAYS = 91;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const series: { date: string; count: number }[] = [];
    for (let i = DAYS - 1; i >= 0; i--) {
      const dt = new Date(today);
      dt.setDate(today.getDate() - i);
      const key = dt.toISOString().slice(0, 10);
      series.push({ date: key, count: counts.get(key) ?? 0 });
    }

    // Pad the first column so each column is a full Sun→Sat week.
    const firstDow = new Date(series[0].date).getDay();
    const padded: GhCell[] = Array<GhCell>(firstDow).fill(null).concat(series);
    const weeks: GhCell[][] = [];
    for (let i = 0; i < padded.length; i += 7) {
      const col = padded.slice(i, i + 7);
      while (col.length < 7) col.push(null);
      weeks.push(col);
    }

    const total = series.reduce((a, b) => a + b.count, 0);
    const max = Math.max(1, ...series.map((s) => s.count));
    return { weeks, total, max, days: DAYS };
  } catch {
    return null;
  }
}
