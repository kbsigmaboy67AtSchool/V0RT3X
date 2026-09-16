
#!/usr/bin/env node
/**
 * V0RT3X simple path-based broadcast relay (Node.js)
 * --------------------------------------------------
 * Each unique path is its own room.
 *
 *   ws://localhost:8787/r/lobby
 *   ws://localhost:8787/r/secret
 *
 * Usage:
 *   npm install ws
 *   node simple-relay.js [port]
 *
 * Default port: 8787
 */

const http = require("http");
const { WebSocketServer } = require("ws");
const { URL } = require("url");

const port = parseInt(process.argv[2] || "8787", 10);

// Map<path, Set<WebSocket>>
const rooms = new Map();

const server = http.createServer((_req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("V0RT3X simple relay — path = room\n");
});

const wss = new WebSocketServer({ noServer: true });

server.on("upgrade", (request, socket, head) => {
  const url = new URL(request.url || "/", `http://${request.headers.host}`);
  const path = url.pathname.replace(/\/+$/, "") || "/";

  wss.handleUpgrade(request, socket, head, (ws) => {
    if (!rooms.has(path)) rooms.set(path, new Set());
    const room = rooms.get(path);
    room.add(ws);

    console.log(`[+] ${path}  (clients: ${room.size})`);

    ws.on("message", (data, isBinary) => {
      for (const client of room) {
        if (client !== ws && client.readyState === 1) {
          client.send(data, { binary: isBinary });
        }
      }
    });

    ws.on("close", () => {
      room.delete(ws);
      console.log(`[-] ${path}  (clients: ${room.size})`);
      if (room.size === 0) rooms.delete(path);
    });

    ws.on("error", () => {
      room.delete(ws);
    });
  });
});

server.listen(port, () => {
  console.log(`V0RT3X relay on ws://0.0.0.0:${port}`);
  console.log(`Example rooms:`);
  console.log(`  ws://localhost:${port}/r/lobby`);
  console.log(`  ws://localhost:${port}/r/my-secret-room`);
});
