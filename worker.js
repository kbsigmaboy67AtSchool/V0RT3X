/**
 * V0RT3X Cloudflare Workers + Durable Objects relay
 * -------------------------------------------------
 * Each unique path is its own broadcast room.
 *
 * Examples:
 *   wss://your-name.workers.dev/r/lobby
 *   wss://your-name.workers.dev/r/secret-friends
 *   wss://your-name.workers.dev/anything-you-want
 *
 * Deploy:
 *   npx wrangler deploy
 *
 * Free tier is enough for light / school use.
 */

export class Room {
  constructor(state, env) {
    this.state = state;
    this.sessions = new Map(); // webSocket → { id }
  }

  async fetch(request) {
    const upgrade = request.headers.get("Upgrade");
    if (upgrade !== "websocket") {
      return new Response("V0RT3X room — expect WebSocket", { status: 426 });
    }

    const pair = new WebSocketPair();
    const [client, server] = Object.values(pair);

    // Accept the server side
    server.accept();

    const id = crypto.randomUUID().slice(0, 8);
    this.sessions.set(server, { id });

    server.addEventListener("message", (event) => {
      // Broadcast to every other client in this Durable Object (this room)
      for (const [ws] of this.sessions) {
        if (ws !== server && ws.readyState === WebSocket.OPEN) {
          try {
            ws.send(event.data);
          } catch (_) {}
        }
      }
    });

    server.addEventListener("close", () => {
      this.sessions.delete(server);
    });

    server.addEventListener("error", () => {
      this.sessions.delete(server);
    });

    return new Response(null, { status: 101, webSocket: client });
  }
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Health check
    if (url.pathname === "/" || url.pathname === "/health") {
      return new Response("V0RT3X Cloudflare relay — path = room\n", {
        headers: { "content-type": "text/plain" },
      });
    }

    // Every other path is a room. Use the full pathname as the Durable Object id.
    // This makes wss://xxx.workers.dev/r/abc and /r/xyz completely separate rooms.
    const roomId = url.pathname.replace(/^\/+/, "") || "default";
    const id = env.ROOMS.idFromName(roomId);
    const room = env.ROOMS.get(id);
    return room.fetch(request);
  },
};
