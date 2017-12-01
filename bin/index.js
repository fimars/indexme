#!/usr/bin/env node

const program = require("commander");
const path = require("path");
const indexme = require("../");

function list(val = "") {
  return val.split(",");
}

program
  .version("0.1.7")
  .usage("[options] path")
  .option("-i, --ignore [globs]", "A ignore list")
  .option("-m, --mode [value]", "markdown[default], pure, tree")
  .parse(process.argv);

const opts = {
  ignore: list(program.ignore),
  mode: program.mode
};

const dirpath = path.join(process.cwd(), program.args[0] || "");

console.log(indexme(dirpath, opts));
