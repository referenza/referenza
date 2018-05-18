"use strict";

const createURLPathComponent = path => {
  path = "" + path;

  // Allowed: $ .
  path = path.replace(/[`~!@#%\^&\*\(\)\+=\{\}\[\]\|\\:;'"<>\?,\/]/g, "");
  path = path.replace(/ /g, "-");
  // Replace contiguous hyphens with single one
  path = path.replace(/-+/g, "-");
  // Removing starting or trailing hyphens
  path = path.replace(/^-+|-+$/g, "");
  // Replace %24 with non-encoded
  path = encodeURIComponent(path).replace(/%24/g, "$");

  return path;
};

module.exports = createURLPathComponent;
