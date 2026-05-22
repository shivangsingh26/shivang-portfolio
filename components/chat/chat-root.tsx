"use client";

import { useEffect, useState } from "react";
import { ChatWidget } from "@/components/chat/chat-widget";
import { CommandPalette } from "@/components/command-palette";
import { OPEN_CHAT_EVENT } from "@/lib/events";

export function ChatRoot() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener(OPEN_CHAT_EVENT, handler);
    return () => window.removeEventListener(OPEN_CHAT_EVENT, handler);
  }, []);

  return (
    <>
      <ChatWidget open={open} onOpenChange={setOpen} />
      <CommandPalette onOpenChat={() => setOpen(true)} />
    </>
  );
}
