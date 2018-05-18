"use strict";

const fs = require("fs-extra");

const nullableReaddir = path => {
  try {
    return fs.readdirSync(path);
  } catch (e) {
    if (e.code === "ENOENT") {
      return null;
    }
    throw e;
  }
};

module.exports = nullableReaddir;
