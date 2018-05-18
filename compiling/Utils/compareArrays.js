"use strict";

const compareArrays = (a, b) => {
  return a.length === b.length && a.every((v, i) => v === b[i]);
};

module.exports = compareArrays;
