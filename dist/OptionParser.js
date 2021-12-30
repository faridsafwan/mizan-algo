"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _lodash = require("lodash");

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

// [{
//   'option' : 'I',
//   'type'   : 'string',
//   'args'   : [/lib1,/lib2,/lib3]
// },
// {
//   'option' : 'h help',
//   'type'   : 'boolean',
//   'set'    : true
// }]
// Initializing a class definition
var OptionParser = /*#__PURE__*/function () {
  function OptionParser() {
    _classCallCheck(this, OptionParser);

    this.flags = [];
  }

  _createClass(OptionParser, [{
    key: "addStringOption",
    value: function addStringOption(string) {
      // TODO - add white space separated flag list (long and short flags)
      var stringOpt = {
        option: string,
        type: "string",
        args: []
      };
      this.flags.push(stringOpt);
    }
  }, {
    key: "addBoolOption",
    value: function addBoolOption(string) {
      // TODO - add white space separated flag list (long and short flags)
      var boolOpt = {
        option: string,
        type: "boolean",
        set: false
      };
      this.flags.push(boolOpt);
    }
  }, {
    key: "isSet",
    value: function isSet(string) {
      // TODO - return true if a flag (bool or string) was set
      var find = this.flags.find(function (flag) {
        return flag.option.includes(string);
      });
      var isSet = false;

      if (find && find.type === "string") {
        if (find.args.length) {
          isSet = true;
        }
      } else if (find && find.type === "boolean") {
        isSet = find.set;
      }

      return isSet;
    }
  }, {
    key: "parse",
    value: function parse(args) {
      var _this = this;

      // TODO - parse command line arguments
      // Separation Criteria
      // 1. - (option after -, arg after option) / (space)
      // 2. -- (option after --, arg after =, eg.--filetype=txt)
      // Extract option, add argument
      var rest = [];

      for (var i = 0; i < args.length; i++) {
        var e = args[i];

        if (!e) {
          continue;
        }

        var char1 = e.substring(0, 1);
        var char2 = e.substring(0, 2);

        if (char2 === "--") {
          (function () {
            var split = e.split("=");
            var option = split[0].substring(2);

            var find = _this.flags.find(function (e) {
              return e.option.includes(option);
            });

            find.args.push(split[1]);
          })();
        } else if (char1 === "-") {
          var slash = e.indexOf("/");
          var equalSign = e.indexOf("=");

          if (slash === -1) {
            (function () {
              // no slash
              var option = e.substring(1);

              var find = _this.flags.find(function (flag) {
                return flag.option.includes(option);
              });

              if (find && find.type === "string") {
                find.args.push(args[i + 1]);
                delete args[i + 1];
              } else {
                var juxtapose = true;

                var filterBool = _this.flags.filter(function (e) {
                  return e.type === "boolean";
                }); // check for possibility to juxtapose


                var _iterator = _createForOfIteratorHelper(option),
                    _step;

                try {
                  var _loop = function _loop() {
                    var c = _step.value;
                    var find = filterBool.find(function (flag) {
                      return flag.option.charAt(0) === c;
                    });

                    if (!find) {
                      juxtapose = false;
                    }
                  };

                  for (_iterator.s(); !(_step = _iterator.n()).done;) {
                    _loop();
                  }
                } catch (err) {
                  _iterator.e(err);
                } finally {
                  _iterator.f();
                }

                if (juxtapose === true) {
                  var _iterator2 = _createForOfIteratorHelper(filterBool),
                      _step2;

                  try {
                    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                      var bool = _step2.value;
                      bool.set = true;
                    }
                  } catch (err) {
                    _iterator2.e(err);
                  } finally {
                    _iterator2.f();
                  }
                } else {
                  if (find) {
                    find.set = true;
                  }
                }
              }
            })();
          } else if (equalSign !== -1) {
            (function () {
              // have equal sign
              var split = e.split("=");
              var option = split[0].substring(1);

              var find = _this.flags.find(function (flag) {
                return flag.option.includes(option);
              });

              find.args.push(split[1]);
            })();
          } else {
            (function () {
              var index = e.indexOf("/");
              var option = e.substring(1, index);
              var args = e.substring(index); // check available one char

              var checkType = _this.flags.find(function (flag) {
                return flag.option.includes(option);
              });

              if (checkType.type === "string") {
                checkType.args.push(args);
              } else {
                checkType.set = true;
              }
            })();
          }
        } else {
          rest.push(e);
        }
      }

      return rest;
    }
  }, {
    key: "get",
    value: function get(string) {
      // TODO - return first string argument for flag
      var find = this.flags.find(function (flag) {
        return flag.option.includes(string);
      });
      return find.args.toString();
    }
  }, {
    key: "getAll",
    value: function getAll(string) {
      // TODO - return all string arguments for flag
      var find = this.flags.find(function (flag) {
        return flag.option.includes(string);
      });
      return find.args;
    }
  }, {
    key: "reset",
    value: function reset() {
      // TODO  - unsets all flags
      var _iterator3 = _createForOfIteratorHelper(this.flags),
          _step3;

      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var iterator = _step3.value;

          if (iterator.type === "string") {
            iterator.args = [];
          } else {
            iterator.set = false;
          }
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
    }
  }]);

  return OptionParser;
}();

exports["default"] = OptionParser;
//# sourceMappingURL=OptionParser.js.map