import fs from "node:fs/promises";
import path from "node:path";

const LOG_DIR = path.join(process.cwd(), "data");
const LOG_FILE = path.join(LOG_DIR, "chat-log.jsonl");

export type ChatLogEntry = {
  ts: string;
  question: string;
  ip?: string;
  userAgent?: string;
};

/**
 * Append a chat question to a JSONL file.
 * Works in local dev + on filesystems with write access. On Vercel serverless
 * the FS is read-only; in that case we silently no-op and rely on console.log
 * (visible via `vercel logs`).
 */
export async function logChatQuestion(entry: ChatLogEntry): Promise<void> {
  console.log("[chat]", JSON.stringify(entry));
  try {
    await fs.mkdir(LOG_DIR, { recursive: true });
    await fs.appendFile(LOG_FILE, JSON.stringify(entry) + "\n", "utf8");
  } catch (err) {
    // Read-only FS (Vercel) — fine. Server log line above is the record.
    void err;
  }
}

export async function readChatLog(): Promise<ChatLogEntry[]> {
  try {
    const raw = await fs.readFile(LOG_FILE, "utf8");
    return raw
      .split("\n")
      .filter(Boolean)
      .map((line) => {
        try {
          return JSON.parse(line) as ChatLogEntry;
        } catch {
          return null;
        }
      })
      .filter((x): x is ChatLogEntry => x !== null)
      .reverse(); // newest first
  } catch {
    return [];
  }
}
