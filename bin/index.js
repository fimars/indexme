const program = require("commander");
const path = require("path");
const indexme = require("../");

function list(val = "") {
  return val.split(",");
}

program
  .version("0.1.0")
  .usage("[options] path")
  .option("-i, --ignore [globs]", "A ignore list")
  .parse(process.argv);

const opts = {
  ignore: list(program.ignore)
};

const dirpath = path.join(process.cwd(), program.args[0] || "");

console.log(dirpath);
console.log(indexme(dirpath, opts));
