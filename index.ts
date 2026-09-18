/**
 * V0RT3X Bun relay
 *   bun run index.ts
 * Deploy: any host with Bun, or Docker with oven/bun
 */
const port = Number(process.env.PORT || 8787);
const rooms = new Map<string, Set<any>>();
const publicList = new Map<string, any>();
const TTL = 10 * 60 * 1000;

function prune() {
  const now = Date.now();
  for (const [u, r] of publicList) if (r.expires && r.expires < now) publicList.delete(u);
}
function broadcast(path: string, data: string | Buffer, except?: any) {
  const room = rooms.get(path);
  if (!room) return;
  for (const c of room) if (c !== except) try { c.send(data); } catch {}
}

Bun.serve({
  port,
  fetch(req, server) {
    const url = new URL(req.url);
    if (server.upgrade(req, { data: { path: url.pathname.replace(/\/+$/, "") || "/" } })) return;
    return new Response("V0RT3X Bun relay — path = room\n");
  },
  websocket: {
    open(ws) {
      const path = (ws.data as any).path || "/";
      if (!rooms.has(path)) rooms.set(path, new Set());
      rooms.get(path)!.add(ws);
      (ws as any)._pub = new Set();
      const sid = crypto.randomUUID().slice(0, 8);
      ws.send(JSON.stringify({ t: "hello", ipId: "bun", sid }));
      if (path.includes("__public_directory")) {
        prune();
        ws.send(JSON.stringify({ t: "public-list", rooms: [...publicList.values()] }));
      }
    },
    message(ws, message) {
      const path = (ws.data as any).path || "/";
      const isDir = path.includes("__public_directory");
      let msg: any = null;
      try { msg = JSON.parse(String(message)); } catch {}
      if (isDir && msg) {
        if (msg.t === "public-sync") {
          prune();
          ws.send(JSON.stringify({ t: "public-list", rooms: [...publicList.values()] }));
          return;
        }
        if (msg.t === "public-announce" && msg.room?.url) {
          const room = { ...msg.room, expires: msg.room.expires || Date.now() + TTL, ts: Date.now() };
          publicList.set(room.url, room);
          (ws as any)._pub.add(room.url);
          broadcast(path, JSON.stringify({ t: "public-announce", room }));
          return;
        }
        if (msg.t === "public-unpublish" && msg.url) {
          publicList.delete(msg.url);
          broadcast(path, JSON.stringify({ t: "public-unpublish", url: msg.url }));
          return;
        }
        return;
      }
      broadcast(path, message, ws);
    },
    close(ws) {
      const path = (ws.data as any).path || "/";
      rooms.get(path)?.delete(ws);
      for (const u of (ws as any)._pub || []) {
        publicList.delete(u);
        broadcast(path, JSON.stringify({ t: "public-unpublish", url: u }));
      }
    },
  },
});
console.log(`V0RT3X Bun relay ws://0.0.0.0:${port}`);
