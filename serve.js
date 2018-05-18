"use strict";

const fs = require("fs");
const express = require("express");
const compression = require("compression");

const serve = (
  {
    port,
    outputDir,
    urlPathPrefix,
  }
) => {
  if (urlPathPrefix) {
    if (!/^\//.test(urlPathPrefix)) {
      throw new SyntaxError("Invalid URL path prefix");
    }
  } else {
    urlPathPrefix = "/";
  }

  if (!outputDir || !fs.lstatSync(outputDir).isDirectory()) {
    throw new TypeError("Invalid output directory");
  }

  if (!port) {
    port = 3072;
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
};

module.exports = serve;
