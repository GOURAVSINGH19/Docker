import prisma  from "@repo/db/client";

Bun.serve({
  port: 8001,
  fetch(req, server) {
    if (server.upgrade(req)) return;
    return new Response("upgrade failed", { status: 500 });
  },
  websocket: {
    message(ws, message) {
      prisma.user.create({
        data: {
          username: Math.random().toString(36).substring(2, 15),
          password: Math.random().toString(36).substring(2, 15),
        },
      });
      ws.send(message);
    },
  },
});
