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
  max_deep = opts.deep === void 0 ? 2 : opts.deep

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
function glob(filepath, deep = 0) {
  if (deep > max_deep || isIgnore(filepath)) {
    return "";
  }

  const lstat = fs.lstatSync(filepath);
  if (lstat.isFile()) {
    return glob_file(filepath);
  } else if (lstat.isDirectory()) {
    return glob_dir(filepath, deep);
  } else return "";
}

function glob_file(filepath) {
  return path.relative(cwd, filepath) || filepath;
}

function glob_dir(dirpath, deep) {
  return {
    path: glob_file(dirpath),
    children: fs
      .readdirSync(dirpath)
      .filter(filepath => !isIgnore(filepath))
      // TODO: filter soft link
      .map(filepath => glob(path.join(dirpath, filepath), deep + 1))
      // HACK: REMOVE ME LATER
      .filter(s => s)
  };
}

function isIgnore(filepath) {
  return ignore.some(ignorepath => minimatch(filepath, ignorepath));
}

exports = module.exports = indexme;
