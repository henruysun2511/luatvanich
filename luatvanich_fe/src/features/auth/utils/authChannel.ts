import { AUTH_CHANNEL_NAME } from "../constants/auth.constants";

export type AuthMessage = "login" | "logout";

let channel: BroadcastChannel | null = null;

const getChannel = () => {
  if (typeof BroadcastChannel === "undefined") return null;
  return (channel ??= new BroadcastChannel(AUTH_CHANNEL_NAME));
};

export const broadcastAuth = (message: AuthMessage) => getChannel()?.postMessage(message);

export function listenAuth(handler: (message: AuthMessage) => void) {
  const ch = getChannel();
  if (!ch) return () => {};
  const listener = (event: MessageEvent<AuthMessage>) => handler(event.data);
  ch.addEventListener("message", listener);
  return () => ch.removeEventListener("message", listener);
}
