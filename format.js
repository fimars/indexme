const transforms = require("./transforms");

function Formatter(mode) {
  const transform = transforms[mode];
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
Formatter.prototype.format = function(node, deep = 0) {
  if (typeof node === "object") {
    let dirs = "";
    dirs += leftpad(deep, this.transform_dir(node.path));
    if (node.children.length) {
      dirs += "\n";
      dirs += node.children.map(node => this.format(node, deep + 1)).join("\n");
    }
    return dirs;
  } else {
    return leftpad(deep, this.transform_file(node));
  }
};

function leftpad(n, str) {
  return " ".repeat(n * 2) + str;
}

exports = module.exports = function format(glob, mode) {
  return new Formatter(mode).format(glob);
};
