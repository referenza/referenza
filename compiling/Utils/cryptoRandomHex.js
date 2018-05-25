"use strict";

const crypto = require("crypto");

const cryptoRandomHex = (size = 8) => {
  return crypto.randomBytes(size).toString("hex");
};

module.exports = cryptoRandomHex;
