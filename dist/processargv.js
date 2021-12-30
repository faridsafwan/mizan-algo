"use strict";

var _OptionParser = _interopRequireDefault(require("./OptionParser"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

'use strict';

var args = process.argv.slice(2);
var op = new _OptionParser["default"]();
op.addBoolOption("h help");
op.addBoolOption("v version");
op.addStringOption("f file");
op.parse(args);
if (op.isSet("help")) console.log("Help!");
if (op.isSet("version")) console.log("1.0");
if (op.isSet("file")) console.log("file: ".concat(op.get("file")));
//# sourceMappingURL=processargv.js.map