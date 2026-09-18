/**
 * V0RT3X Deno Deploy / Deno relay
 *
 * Local:  deno run -A main.ts
 * Deploy: https://dash.deno.com → New Project → link this file
 *         → get wss://YOUR-PROJECT.deno.dev/r/room
 */
const rooms = new Map<string, Set<WebSocket>>();
const publicList = new Map<string, Record<string, unknown>>();
const TTL = 10 * 60 * 1000;

function prune() {
  const now = Date.now();
  for (const [url, r] of publicList) {
    if ((r as { expires?: number }).expires && (r as { expires: number }).expires < now) publicList.delete(url);
  }
}

function broadcast(path: string, data: string | ArrayBuffer, except?: WebSocket) {
  const room = rooms.get(path);
  if (!room) return;
  for (const c of room) {
    if (c !== except && c.readyState === WebSocket.OPEN) {
      try { c.send(data); } catch { /* */ }
    }
  }
}

async function hashIp(ip: string) {
  const data = new TextEncoder().encode("v0rt3x|" + ip);
  const buf = await crypto.subtle.digest("SHA-256", data);
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("").slice(0, 10);
}

Deno.serve({ port: Number(Deno.env.get("PORT") || 8787) }, async (req) => {
  const url = new URL(req.url);
  if (req.headers.get("upgrade")?.toLowerCase() !== "websocket") {
    return new Response("V0RT3X Deno relay — path = room · /r/__public_directory\n", {
      headers: { "content-type": "text/plain" },
    });
  }

  const path = url.pathname.replace(/\/+$/, "") || "/";
  const isDir = path.includes("__public_directory");
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const ipId = await hashIp(ip);

  const { socket, response } = Deno.upgradeWebSocket(req);
  if (!rooms.has(path)) rooms.set(path, new Set());
  const room = rooms.get(path)!;
  const published = new Set<string>();
  const sid = crypto.randomUUID().slice(0, 8);

  socket.onopen = () => {
    room.add(socket);
    socket.send(JSON.stringify({ t: "hello", ipId, sid }));
    if (isDir) {
      prune();
      socket.send(JSON.stringify({ t: "public-list", rooms: [...publicList.values()] }));
    }
  };

  socket.onmessage = (ev) => {
    let msg: Record<string, unknown> | null = null;
    try { msg = JSON.parse(String(ev.data)); } catch { /* */ }

    if (isDir && msg) {
      if (msg.t === "public-sync") {
        prune();
        socket.send(JSON.stringify({ t: "public-list", rooms: [...publicList.values()] }));
        return;
      }
      if (msg.t === "public-announce" && msg.room && typeof msg.room === "object") {
        const roomObj = {
          ...(msg.room as object),
          owner: (msg.room as { owner?: string }).owner || sid,
          expires: (msg.room as { expires?: number }).expires || Date.now() + TTL,
          ts: Date.now(),
        } as Record<string, unknown>;
        const u = String(roomObj.url || "");
        if (u) {
          publicList.set(u, roomObj);
          published.add(u);
          broadcast(path, JSON.stringify({ t: "public-announce", room: roomObj }));
        }
        return;
      }
      if (msg.t === "public-unpublish" && msg.url) {
        publicList.delete(String(msg.url));
        published.delete(String(msg.url));
        broadcast(path, JSON.stringify({ t: "public-unpublish", url: msg.url }));
        return;
      }
      return;
    }
    broadcast(path, ev.data, socket);
  };

  socket.onclose = () => {
    room.delete(socket);
    if (isDir) {
      for (const u of published) {
        publicList.delete(u);
        broadcast(path, JSON.stringify({ t: "public-unpublish", url: u }));
      }
    }
    if (room.size === 0) rooms.delete(path);
  };

  return response;
});

console.log("V0RT3X Deno relay ready");
