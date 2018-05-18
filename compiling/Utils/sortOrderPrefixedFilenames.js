"use strict";

const sortOrderPrefixedFilenames = (a, b) => {
  let idA = Number.parseInt(a.slice(0, a.indexOf(".")), 10);
  let idB = Number.parseInt(b.slice(0, b.indexOf(".")), 10);

  return idA < idB ? -1 : idA > idB ? 1 : 0;
};

module.exports = sortOrderPrefixedFilenames;
