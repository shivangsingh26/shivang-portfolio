export const OPEN_CHAT_EVENT = "shivang:open-chat";
export const OPEN_PALETTE_EVENT = "shivang:open-palette";

export function dispatchOpenChat() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(OPEN_CHAT_EVENT));
  }
}

export function dispatchOpenPalette() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(OPEN_PALETTE_EVENT));
  }
}
