"use strict";

const fs = require("fs-extra");

const nullableStat = path => {
  try {
    return fs.lstatSync(path);
  } catch (err) {
    if (err.code == "ENOENT") {
      return null;
    } else {
      throw err;
    }
  }
};

module.exports = nullableStat;
