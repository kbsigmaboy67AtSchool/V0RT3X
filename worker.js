/**
 * V0RT3X Cloudflare Workers + Durable Objects relay
 * Path = room. /r/__public_directory = public list with TTL + unpublish.
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
    await this.state.storage.put("publicRooms", rooms.slice(-100));
  }
  prune(rooms) {
    const now = Date.now();
    return rooms.filter((r) => r && r.url && (!r.expires || r.expires > now));
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
    this.sessions.set(server, { id: sid, ipId, publishedUrls: new Set() });

    server.send(JSON.stringify({ t: "hello", ipId, sid }));

    if (this.isDirectory) {
      let rooms = this.prune(await this.loadRooms());
      await this.saveRooms(rooms);
      server.send(JSON.stringify({ t: "public-list", rooms }));
    }

    const broadcastDir = async (msgObj) => {
      const msg = JSON.stringify(msgObj);
      for (const [ws] of this.sessions) {
        if (ws.readyState === WebSocket.OPEN) {
          try { ws.send(msg); } catch (_) {}
        }
      }
    };

    server.addEventListener("message", async (event) => {
      let parsed = null;
      try {
        parsed = JSON.parse(typeof event.data === "string" ? event.data : "");
      } catch (_) {}

      if (this.isDirectory && parsed) {
        if (parsed.t === "public-sync") {
          let rooms = this.prune(await this.loadRooms());
          await this.saveRooms(rooms);
          try {
            server.send(JSON.stringify({ t: "public-list", rooms }));
          } catch (_) {}
          return;
        }
        if (parsed.t === "public-announce" && parsed.room && parsed.room.url) {
          const room = {
            ...parsed.room,
            owner: parsed.room.owner || sid,
            expires: parsed.room.expires || Date.now() + 10 * 60 * 1000,
            ts: Date.now(),
          };
          let rooms = this.prune(await this.loadRooms());
          const idx = rooms.findIndex((r) => r.url === room.url);
          if (idx >= 0) rooms[idx] = room;
          else rooms.push(room);
          await this.saveRooms(rooms);
          const sess = this.sessions.get(server);
          if (sess) sess.publishedUrls.add(room.url);
          await broadcastDir({ t: "public-announce", room });
          return;
        }
        if (parsed.t === "public-unpublish" && parsed.url) {
          let rooms = this.prune(await this.loadRooms());
          rooms = rooms.filter((r) => r.url !== parsed.url);
          await this.saveRooms(rooms);
          const sess = this.sessions.get(server);
          if (sess) sess.publishedUrls.delete(parsed.url);
          await broadcastDir({ t: "public-unpublish", url: parsed.url });
          return;
        }
        return; // don't fall through on directory
      }

      // Normal room broadcast
      for (const [ws] of this.sessions) {
        if (ws !== server && ws.readyState === WebSocket.OPEN) {
          try { ws.send(event.data); } catch (_) {}
        }
      }
    });

    const cleanup = async () => {
      const sess = this.sessions.get(server);
      this.sessions.delete(server);
      if (this.isDirectory && sess && sess.publishedUrls.size) {
        let rooms = this.prune(await this.loadRooms());
        const gone = [...sess.publishedUrls];
        rooms = rooms.filter((r) => !gone.includes(r.url));
        await this.saveRooms(rooms);
        for (const u of gone) {
          await broadcastDir({ t: "public-unpublish", url: u });
        }
      }
    };
    server.addEventListener("close", () => { cleanup(); });
    server.addEventListener("error", () => { cleanup(); });

    return new Response(null, { status: 101, webSocket: client });
  }
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === "/" || url.pathname === "/health") {
      return new Response("V0RT3X relay — /r/__public_directory = public list (TTL + auto-unpublish)\n", {
        headers: { "content-type": "text/plain" },
      });
    }
    const roomId = url.pathname.replace(/^\/+/, "") || "default";
    const id = env.ROOMS.idFromName(roomId);
    return env.ROOMS.get(id).fetch(request);
  },
};
