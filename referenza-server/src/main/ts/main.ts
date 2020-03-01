import * as fs from "fs";
import express from "express";
import compression from "compression";

export interface serveArgs {
  port?: number;
  outputDir: string;
  prefix?: string;
}

export function serve (
  {
    port = 3072,
    outputDir,
    prefix = "/",
  }: serveArgs
): void {
  if (!/^\//.test(prefix)) {
    throw new SyntaxError("Invalid URL path prefix");
  }

  if (!fs.lstatSync(outputDir).isDirectory()) {
    throw new TypeError("Invalid output directory");
  }

  if (!Number.isSafeInteger(port) || port < 1 || port > 65535) {
    throw new TypeError("Invalid port number");
  }

  let server = express();

  server.use(compression());
  server.use(prefix, express.static(outputDir));

  if (!/^\/+$/.test(prefix)) {
    server.get("/", (_, res) => {
      res.redirect(prefix + "/");
    });
  }

  server.listen(port, () => {
    console.log(`referenza static server is now listening on port ${port}`);
  });
}
