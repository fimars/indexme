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

  this.prefix = transform.prefix || '  '
  this.prefix_last = transform.prefix_last || '  '
}
/**
 * Format glob object.
 * @param {Object, String} node
*/
Formatter.prototype.format = function(node, last = true, prefix = '') {
  if (typeof node === "object") {
    let dirs = "";
    dirs += prefix + this.transform_dir(node.path, last);
    if (node.children.length) {
      dirs += "\n";
      dirs += node.children.map((node, idx, arr) => {
        const node_last = idx === arr.length - 1
        const prefix_next = last ? this.prefix_last : this.prefix
        const res = this.format(node, node_last , prefix + prefix_next)
        return res
      }).join("\n");
    }
    return dirs;
  } else {
    return prefix + this.transform_file(node, last);
  }
};

exports = module.exports = function format(glob, mode) {
  return new Formatter(mode).format(glob);
};

/**
 * [
 *  11,
 *  [11, 22],
 *  1122,
 *  [11, [22, 33], [44]]
 * ]
 * 
 * 11
 * - 11
 * - 22
 * 1122
 * - 11
 * - - 22
 * - - 33
 * - - 44
 */