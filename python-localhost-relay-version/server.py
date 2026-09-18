#!/usr/bin/env python3
"""
V0RT3X Python relay (websockets library)

  pip install websockets
  python server.py [port]

  ws://localhost:8787/r/lobby
  ws://localhost:8787/r/__public_directory
"""
from __future__ import annotations
import asyncio, hashlib, json, sys, time, uuid
from collections import defaultdict

try:
    from websockets.asyncio.server import serve
    from websockets.server import ServerConnection
except ImportError:
    from websockets.server import serve  # type: ignore

PORT = int(sys.argv[1] if len(sys.argv) > 1 else 8787)
TTL = 10 * 60
rooms: dict[str, set] = defaultdict(set)
public_list: dict[str, dict] = {}


def ip_id(ip: str) -> str:
    return hashlib.sha256(f"v0rt3x|{ip}".encode()).hexdigest()[:10]


def prune():
    now = time.time() * 1000
    dead = [u for u, r in public_list.items() if r.get("expires", 0) and r["expires"] < now]
    for u in dead:
        public_list.pop(u, None)


async def broadcast(path: str, data, except_ws=None):
    for ws in list(rooms.get(path, ())):
        if ws is except_ws:
            continue
        try:
            await ws.send(data)
        except Exception:
            pass


async def handler(ws):
    path = "/"
    try:
        path = ws.request.path if hasattr(ws, "request") else getattr(ws, "path", "/")
    except Exception:
        pass
    path = (path or "/").rstrip("/") or "/"
    is_dir = "__public_directory" in path
    ip = "unknown"
    try:
        ip = ws.request.headers.get("X-Forwarded-For", "unknown").split(",")[0].strip()
    except Exception:
        pass
    sid = str(uuid.uuid4())[:8]
    published: set[str] = set()
    rooms[path].add(ws)
    await ws.send(json.dumps({"t": "hello", "ipId": ip_id(ip), "sid": sid}))
    if is_dir:
        prune()
        await ws.send(json.dumps({"t": "public-list", "rooms": list(public_list.values())}))
    print(f"[+] {path} clients={len(rooms[path])}")
    try:
        async for raw in ws:
            msg = None
            try:
                msg = json.loads(raw)
            except Exception:
                pass
            if is_dir and isinstance(msg, dict):
                if msg.get("t") == "public-sync":
                    prune()
                    await ws.send(json.dumps({"t": "public-list", "rooms": list(public_list.values())}))
                    continue
                if msg.get("t") == "public-announce" and isinstance(msg.get("room"), dict):
                    room = dict(msg["room"])
                    room.setdefault("owner", sid)
                    room.setdefault("expires", time.time() * 1000 + TTL * 1000)
                    room["ts"] = time.time() * 1000
                    u = room.get("url")
                    if u:
                        public_list[u] = room
                        published.add(u)
                        await broadcast(path, json.dumps({"t": "public-announce", "room": room}))
                    continue
                if msg.get("t") == "public-unpublish" and msg.get("url"):
                    public_list.pop(msg["url"], None)
                    published.discard(msg["url"])
                    await broadcast(path, json.dumps({"t": "public-unpublish", "url": msg["url"]}))
                    continue
                continue
            await broadcast(path, raw, except_ws=ws)
    finally:
        rooms[path].discard(ws)
        if is_dir:
            for u in list(published):
                public_list.pop(u, None)
                await broadcast(path, json.dumps({"t": "public-unpublish", "url": u}))
        if not rooms[path]:
            rooms.pop(path, None)
        print(f"[-] {path} clients={len(rooms.get(path, ()))}")


async def main():
    print(f"V0RT3X Python relay ws://0.0.0.0:{PORT}")
    async with serve(handler, "0.0.0.0", PORT):
        await asyncio.Future()


if __name__ == "__main__":
    asyncio.run(main())
