import chai from "chai";
import "mocha";
import {generateMermaidSVG} from "../../../../main/ts/Compilation/Parsing/generateMermaidSVG";
import chaiAsPromised = require("chai-as-promised");

const {expect} = chai;

chai.use(chaiAsPromised);

describe("generateMermaidSVG", () => {
  it("should generate SVG when given valid mermaid code", () => {
    let mermaid = `
      graph TD
      A-->B
    `;
    return expect(generateMermaidSVG(mermaid)).to.eventually.match(/^<svg /);
  });
});
