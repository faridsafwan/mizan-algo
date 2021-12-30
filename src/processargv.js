import OptionParser from "./OptionParser";

("use strict");

const args = process.argv.slice(2);

let op = new OptionParser();

op.addBoolOption("h help");
op.addBoolOption("v version");
op.addStringOption("f file");

op.parse(args);

if (op.isSet("help")) console.log("Help! ");
if (op.isSet("version")) console.log("1.0");
if (op.isSet("file")) console.log(`file: ${op.get("file")}`);
