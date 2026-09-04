const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const hostname = process.env.HOST || "localhost";
const port = parseInt(process.env.PORT || "3001", 10);

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

function logRequest(req, statusCode, durationMs) {
  const timestamp = new Date().toISOString();
  console.log(
    `[${timestamp}] ${req.method} ${req.url} -> ${statusCode} (${durationMs}ms)`
  );
}

app
  .prepare()
  .then(() => {
    const server = createServer((req, res) => {
      const start = Date.now();

      res.on("finish", () => {
        logRequest(req, res.statusCode, Date.now() - start);
      });

      try {
        const parsedUrl = parse(req.url, true);
        handle(req, res, parsedUrl);
      } catch (err) {
        console.error("Error handling request:", req.url, err);
        res.statusCode = 500;
        res.end("Internal Server Error");
      }
    });

    server.listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port} (${dev ? "development" : "production"})`);
    });

    let shuttingDown = false;

    async function shutdown(signal) {
      if (shuttingDown) return;
      shuttingDown = true;
      console.log(`\n${signal} received. Shutting down gracefully...`);

      server.close(async (err) => {
        if (err) {
          console.error("Error closing HTTP server:", err);
          process.exit(1);
        }

        try {
          const { prisma } = require("./lib/prisma");
          await prisma.$disconnect();
          console.log("Prisma disconnected.");
        } catch (e) {
          console.warn("Skipped Prisma disconnect:", e.message);
        }

        console.log("Shutdown complete.");
        process.exit(0);
      });

      setTimeout(() => {
        console.error("Forced shutdown after timeout.");
        process.exit(1);
      }, 10_000).unref();
    }

    process.on("SIGINT", () => shutdown("SIGINT"));
    process.on("SIGTERM", () => shutdown("SIGTERM"));
  })
  .catch((err) => {
    console.error("Error starting server:", err);
    process.exit(1);
  });