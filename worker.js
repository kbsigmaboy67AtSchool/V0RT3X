export class Room {
  constructor(state, env) {
    this.state = state;
    this.sessions = new Map(); // ws -> { id, ipId }
  }

  async hashIp(ip) {
    const data = new TextEncoder().encode("v0rt3x|" + ip);
    const buf = await crypto.subtle.digest("SHA-256", data);
    const hex = [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, "0")).join("");
    return hex.slice(0, 10); // short stable id
  }

  async fetch(request) {
    const upgrade = request.headers.get("Upgrade");
    if (upgrade !== "websocket") {
      return new Response("V0RT3X room — expect WebSocket", { status: 426 });
    }

    const ip = request.headers.get("CF-Connecting-IP") || "unknown";
    const ipId = await this.hashIp(ip);

    const pair = new WebSocketPair();
    const [client, server] = Object.values(pair);
    server.accept();

    const sid = crypto.randomUUID().slice(0, 8);
    this.sessions.set(server, { id: sid, ipId });

    // Tell this client their IP hash (never the raw IP)
    server.send(JSON.stringify({ t: "hello", ipId, sid }));

    server.addEventListener("message", (event) => {
      for (const [ws] of this.sessions) {
        if (ws !== server && ws.readyState === WebSocket.OPEN) {
          try { ws.send(event.data); } catch (_) {}
        }
      }
    });

    server.addEventListener("close", () => this.sessions.delete(server));
    server.addEventListener("error", () => this.sessions.delete(server));

    return new Response(null, { status: 101, webSocket: client });
  }
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === "/" || url.pathname === "/health") {
      return new Response("V0RT3X relay — path = room\n", {
        headers: { "content-type": "text/plain" },
      });
    }
    const roomId = url.pathname.replace(/^\/+/, "") || "default";
    const id = env.ROOMS.idFromName(roomId);
    return env.ROOMS.get(id).fetch(request);
  },
};
