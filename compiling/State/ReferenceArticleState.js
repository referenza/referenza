"use strict";

const compareArrays = require("../Utils/compareArrays");
const checkArrayType = require("../Utils/checkArrayType");
const isNumber = require("../Utils/isNumber");
const isString = require("../Utils/isString");

const ArticleState = require("./ArticleState");

class ReferenceArticleState extends ArticleState {
  constructor ({descriptionMtime, signatureMtimes, argumentNames, argumentMtimes, returnMtimes}) {
    super();

    // Descriptions must exist
    if (!isNumber(descriptionMtime)) {
      throw new Error("Invalid reference article state description modification time");
    }

    if (!checkArrayType(signatureMtimes, isNumber)) {
      throw new Error("Invalid reference article state signature modification times");
    }

    if (!checkArrayType(argumentNames, isString)) {
      throw new Error("Invalid reference article state argument names");
    }

    if (!checkArrayType(argumentMtimes, isNumber)) {
      throw new Error("Invalid reference article state argument modification times");
    }

    if (!checkArrayType(returnMtimes, isNumber)) {
      throw new Error("Invalid reference article state return modification times");
    }

    this.__objtype = "ReferenceArticleState";
    this.descriptionMtime = descriptionMtime;
    this.signatureMtimes = signatureMtimes;
    this.argumentNames = argumentNames;
    this.argumentMtimes = argumentMtimes;
    this.returnMtimes = argumentMtimes;

    Object.freeze(this);
  }

  isDiffTo (other) {
    if (!other || typeof other != "object" || !(other instanceof ArticleState)) {
      throw new Error("Invalid state object");
    }

    return !(other instanceof ReferenceArticleState) ||
           this.descriptionMtime != other.descriptionMtime ||
           !compareArrays(this.signatureMtimes, other.signatureMtimes) ||
           !compareArrays(this.argumentNames, other.argumentNames) ||
           !compareArrays(this.argumentMtimes, other.argumentMtimes) ||
           !compareArrays(this.returnMtimes, other.returnMtimes);
  }
}

module.exports = ReferenceArticleState;
