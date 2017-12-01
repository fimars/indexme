const fs = require("fs");
const path = require("path");
const minimatch = require("minimatch");
const cwd = process.cwd();
const format = require("./format");

let ignore = [];

function indexme(filepath, opts = {}) {
  const mode = opts.mode || "markdown";
  ignore = opts.ignore || [];

  if (!fs.existsSync(filepath)) {
    throw new Error("path doesn't exist: " + filepath);
  }
  return format(glob(filepath), mode);
}

/**
 * ls filepath -r
 * @param {String} filepath
 * @return {Glob}
 */
function glob(filepath) {
  if (isIgnore(filepath)) {
    return "";
  }

  const lstat = fs.lstatSync(filepath);
  if (lstat.isFile()) {
    return glob_file(filepath);
  } else if (lstat.isDirectory()) {
    return glob_dir(filepath);
  } else return "";
}

function glob_file(filepath) {
  return path.relative(cwd, filepath) || filepath;
}

function glob_dir(dirpath) {
  return {
    path: glob_file(dirpath),
    children: fs
      .readdirSync(dirpath)
      .filter(filepath => !isIgnore(filepath))
      // TODO: filter soft link
      .map(filepath => glob(path.join(dirpath, filepath)))
      // HACK: REMOVE ME LATER
      .filter(s => s)
  };
}

function isIgnore(filepath) {
  return ignore.some(ignorepath => minimatch(filepath, ignorepath));
}

exports = module.exports = indexme;
