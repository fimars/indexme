const transforms = require("./transforms");

function Formatter(mode) {
  const transform = transforms[mode];
  if (!transform) throw new Error("unknow mode: " + mode);
  if (transform.uiversal) {
    this.transform_dir = transform.uiversal;
    this.transform_file = transform.uiversal;
  } else {
    this.transform_dir = transform.dir;
    this.transform_file = transform.file;
  }
}
/**
 * Format glob object.
 * @param {Object, String} node
 * @param {Number} deep
 */
Formatter.prototype.format = function(node, deep = 0, last = true) {
  if (typeof node === "object") {
    let dirs = "";
    dirs += this.transform_dir(node.path, deep, last);
    if (node.children.length) {
      dirs += "\n";
      dirs += node.children.map((node, idx, arr) => this.format(node, deep + 1, idx === arr.length - 1)).join("\n");
    }
    return dirs;
  } else {
    return this.transform_file(node, deep, last);
  }
};

exports = module.exports = function format(glob, mode) {
  return new Formatter(mode).format(glob);
};
