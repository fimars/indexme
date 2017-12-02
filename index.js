const fs = require("fs");
const path = require("path");
const minimatch = require("minimatch");
const cwd = process.cwd();
const format = require("./format");

let ignore = [];
let max_deep = 2;

function indexme(filepath, opts = {}) {
  const mode = opts.mode || "markdown";
  ignore = opts.ignore || [];
  max_deep = opts.deep === void 0 ? 2 : opts.deep;

  if (max_deep < 1) {
    throw new Error("[Index Me] max_deep < 1");
  }

  if (!fs.existsSync(filepath)) {
    throw new Error("[Index Me] path doesn't exist: " + filepath);
  }
  return format(glob(filepath), mode);
}

/**
 * ls filepath -r
 * @param {String} filepath
 * @param {Number} deep=0
 * @return {Glob}
 */
function glob(iopath, deep = 0) {
  debugger;
  if (deep > max_deep || is_ignore(iopath)) {
    return "";
  }

  const lstat = fs.lstatSync(iopath);
  if (lstat.isFile()) {
    return relative(iopath);
  } else if (lstat.isDirectory()) {
    return glob_dir(iopath, deep);
  } else if (lstat.isSymbolicLink()) {
    return relative(iopath) + " -> " + fs.readlinkSync(iopath);
  } else return "";
}

function relative(filepath) {
  return path.relative(cwd, filepath) || filepath;
}

function glob_dir(dirpath, deep) {
  return {
    path: relative(dirpath),
    children:
      deep >= max_deep
        ? []
        : fs
            .readdirSync(dirpath)
            .filter(filepath => !is_ignore(filepath))
            // TODO: filter soft link
            .map(filepath => glob(path.join(dirpath, filepath), deep + 1))
    // HACK: REMOVE ME LATER
    // .filter(s => s)
  };
}

function is_ignore(filepath) {
  return ignore.some(ignorepath => minimatch(filepath, ignorepath));
}

exports = module.exports = indexme;
