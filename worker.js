/**
 * V0RT3X Cloudflare Workers + Durable Objects relay
 * Path = room. Special: /r/__public_directory stores public room announcements.
 */
export class Room {
  constructor(state, env) {
    this.state = state;
    this.sessions = new Map();
    this.isDirectory = false;
  }

  async hashIp(ip) {
    const data = new TextEncoder().encode("v0rt3x|" + ip);
    const buf = await crypto.subtle.digest("SHA-256", data);
    return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("").slice(0, 10);
  }

  async loadRooms() {
    return (await this.state.storage.get("publicRooms")) || [];
  }
  async saveRooms(rooms) {
    // keep last 100
    await this.state.storage.put("publicRooms", rooms.slice(-100));
  }

  async fetch(request) {
    const upgrade = request.headers.get("Upgrade");
    if (upgrade !== "websocket") {
      return new Response("V0RT3X room — expect WebSocket", { status: 426 });
    }

    const url = new URL(request.url);
    this.isDirectory = url.pathname.includes("__public_directory");

    const ip = request.headers.get("CF-Connecting-IP") || "unknown";
    const ipId = await this.hashIp(ip);

    const pair = new WebSocketPair();
    const [client, server] = Object.values(pair);
    server.accept();

    const sid = crypto.randomUUID().slice(0, 8);
    this.sessions.set(server, { id: sid, ipId });

    server.send(JSON.stringify({ t: "hello", ipId, sid }));

    if (this.isDirectory) {
      const rooms = await this.loadRooms();
      server.send(JSON.stringify({ t: "public-list", rooms }));
    }

    server.addEventListener("message", async (event) => {
      let data = event.data;
      let parsed = null;
      try {
        parsed = JSON.parse(typeof data === "string" ? data : "");
      } catch (_) {}

      if (this.isDirectory && parsed) {
        if (parsed.t === "public-sync") {
          const rooms = await this.loadRooms();
          try {
            server.send(JSON.stringify({ t: "public-list", rooms }));
          } catch (_) {}
          return;
        }
        if (parsed.t === "public-announce" && parsed.room) {
          let rooms = await this.loadRooms();
          const idx = rooms.findIndex((r) => r.url === parsed.room.url);
          if (idx >= 0) rooms[idx] = parsed.room;
          else rooms.push(parsed.room);
          await this.saveRooms(rooms);
          // broadcast announce
          const msg = JSON.stringify({ t: "public-announce", room: parsed.room });
          for (const [ws] of this.sessions) {
            if (ws.readyState === WebSocket.OPEN) {
              try {
                ws.send(msg);
              } catch (_) {}
            }
          }
          return;
        }
      }

      // Normal room: broadcast to others
      for (const [ws] of this.sessions) {
        if (ws !== server && ws.readyState === WebSocket.OPEN) {
          try {
            ws.send(event.data);
          } catch (_) {}
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
      return new Response("V0RT3X relay — path = room · /r/__public_directory = public list\n", {
        headers: { "content-type": "text/plain" },
      });
    }
    const roomId = url.pathname.replace(/^\/+/, "") || "default";
    const id = env.ROOMS.idFromName(roomId);
    return env.ROOMS.get(id).fetch(request);
  },
};
