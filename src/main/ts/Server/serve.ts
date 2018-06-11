import * as fs from "fs";
import * as express from "express";
import * as compression from "compression";

export interface serveArgs {
  port?: number;
  outputDir: string;
  urlPathPrefix?: string;
}

export function serve (
  {
    port = 3072,
    outputDir,
    urlPathPrefix = "/",
  }: serveArgs
): void {
  if (!/^\//.test(urlPathPrefix)) {
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
  server.use(urlPathPrefix, express.static(outputDir));

  if (!/^\/+$/.test(urlPathPrefix)) {
    server.get("/", (req, res) => {
      res.redirect(urlPathPrefix + "/");
    });
  }

  server.listen(port, () => {
    console.log(`referenza static server is now listening on port ${port}`);
  });
}
