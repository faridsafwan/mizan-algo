var assert = require("assert");
import { expect } from "chai";
import OptionParser from "../src/OptionParser";

describe("OptionParser", function () {
  it("array should contain passed arguments", function () {
    let op = new OptionParser();
    op.addStringOption("I");
    op.addStringOption("f file");
    op.addStringOption("t filetype");

    op.addBoolOption("h help");
    op.addBoolOption("v version");
    var argv =
      "a -I/lib1 b -I=/lib2 -I /lib3 c -help -file/dev/null --filetype=txt -filetype cpp d".split(
        " "
      );
    var rest = op.parse(argv);
    expect(rest.length == 4).to.be.true;
    expect(rest.indexOf("a") != -1).to.be.true;
    expect(rest.indexOf("b") != -1).to.be.true;
    expect(rest.indexOf("c") != -1).to.be.true;
    expect(rest.indexOf("d") != -1).to.be.true;

    // Any flag that represents the same option, should return the same value
    expect(op.isSet("file")).to.be.true;
    expect(op.isSet("f")).to.be.true;

    expect(op.isSet("help")).to.be.true;
    expect(op.isSet("filetype")).to.be.true;

    expect(op.isSet("I")).to.be.true;
    expect(op.isSet("version")).to.be.false;

    var iOptions = op.getAll("I");
    expect(iOptions.length == 3).to.be.true;

    // They all have to be here, but can come in any order
    expect(iOptions.indexOf("/lib1") != -1).to.be.true;
    expect(iOptions.indexOf("/lib2") != -1).to.be.true;
    expect(iOptions.indexOf("/lib3") != -1).to.be.true;

    expect("/dev/null").to.equal(op.get("file"));

    var typeOptions = op.getAll("filetype");
    expect(typeOptions.length == 2).to.be.true;
    expect(typeOptions.indexOf("txt") != -1).to.be.true;
    expect(typeOptions.indexOf("cpp") != -1).to.be.true;

    // Unset all flags, ready to parse new input
    op.reset();

    expect(op.isSet("file")).to.be.false;
    expect(op.isSet("f")).to.be.false;

    expect(op.isSet("help")).to.be.false;
    expect(op.isSet("filetype")).to.be.false;

    expect(op.isSet("I")).to.be.false;
    expect(op.isSet("version")).to.be.false;

    //Allow juxtaposition of boolean flags
    rest = op.parse("a b c -hv d".split(" "));
    expect(rest.length === 4).to.be.true;
    expect(op.isSet("help")).to.be.true;
    expect(op.isSet("version")).to.be.true;
  });
});
