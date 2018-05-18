"use strict";

const isNumber = v => {
  return typeof v == "number" && Number.isFinite(v);
};

module.exports = isNumber;
