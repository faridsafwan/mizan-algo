import { _ } from "lodash";

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
export default class OptionParser {
  constructor() {
    this.flags = [];
  }

  addStringOption(string) {
    // TODO - add white space separated flag list (long and short flags)
    const stringOpt = {
      option: string,
      type: "string",
      args: [],
    };
    this.flags.push(stringOpt);
  }

  addBoolOption(string) {
    // TODO - add white space separated flag list (long and short flags)
    const boolOpt = {
      option: string,
      type: "boolean",
      set: false,
    };
    this.flags.push(boolOpt);
  }

  isSet(string) {
    // TODO - return true if a flag (bool or string) was set
    let find = this.flags.find((flag) => flag.option.includes(string));
    let isSet = false;
    if (find && find.type === "string") {
      if (find.args.length) {
        isSet = true;
      }
    } else if (find && find.type === "boolean") {
      isSet = find.set;
    }
    return isSet;
  }

  parse(args) {
    // TODO - parse command line arguments

    // Separation Criteria
    // 1. - (option after -, arg after option) / (space)
    // 2. -- (option after --, arg after =, eg.--filetype=txt)
    // Extract option, add argument
    let rest = [];
    for (let i = 0; i < args.length; i++) {
      const e = args[i];
      if (!e) {
        continue;
      }
      const char1 = e.substring(0, 1);
      const char2 = e.substring(0, 2);
      if (char2 === "--") {
        const split = e.split("=");
        const option = split[0].substring(2);
        let find = this.flags.find((e) => e.option.includes(option));
        find.args.push(split[1]);
      } else if (char1 === "-") {
        const slash = e.indexOf("/");
        const equalSign = e.indexOf("=");
        if (slash === -1) {
          // no slash
          const option = e.substring(1);
          let find = this.flags.find((flag) => flag.option.includes(option));
          if (find && find.type === "string") {
            find.args.push(args[i + 1]);
            delete args[i + 1];
          } else {
            let juxtapose = true;
            const filterBool = this.flags.filter((e) => e.type === "boolean");
            // check for possibility to juxtapose
            for (const c of option) {
              let find = filterBool.find((flag) => flag.option.charAt(0) === c);
              if (!find) {
                juxtapose = false;
              }
            }
            if (juxtapose === true) {
              for (const bool of filterBool) {
                bool.set = true;
              }
            } else {
              if (find) {
                find.set = true;
              }
            }
          }
        } else if (equalSign !== -1) {
          // have equal sign
          const split = e.split("=");
          const option = split[0].substring(1);
          let find = this.flags.find((flag) => flag.option.includes(option));
          find.args.push(split[1]);
        } else {
          const index = e.indexOf("/");
          const option = e.substring(1, index);
          const args = e.substring(index);
          // check available one char
          const checkType = this.flags.find((flag) =>
            flag.option.includes(option)
          );
          if (checkType.type === "string") {
            checkType.args.push(args);
          } else {
            checkType.set = true;
          }
        }
      } else {
        rest.push(e);
      }
    }
    return rest;
  }

  get(string) {
    // TODO - return first string argument for flag
    let find = this.flags.find((flag) => flag.option.includes(string));
    return find.args.toString();
  }

  getAll(string) {
    // TODO - return all string arguments for flag
    let find = this.flags.find((flag) => flag.option.includes(string));
    return find.args;
  }

  reset() {
    // TODO  - unsets all flags
    for (const iterator of this.flags) {
      if (iterator.type === "string") {
        iterator.args = [];
      } else {
        iterator.set = false;
      }
    }
  }
}
