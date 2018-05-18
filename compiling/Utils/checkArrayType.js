"use strict";

const checkArrayType = (arr, checker) => {
  return Array.isArray(arr) && arr.every(v => checker(v));
};

module.exports = checkArrayType;
