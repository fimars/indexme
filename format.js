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
  const default_left_pad = "  ";
  this.leftpad = transform.leftpad || default_left_pad;
  this.leftpad_at_end = transform.leftpad_at_end || default_left_pad;
}
/**
 * Calculate a file node sort score.
 * @param {Object, String} node 
 */
Formatter.prototype.caculScore = function(node) {
    const nodeName = node.path || node || ''
    const isDotFile = (node) => typeof node === 'string' && node[0] === '.'
    const isDir = (node) => typeof node === 'object'
    // + charcode

    let score = nodeName.charCodeAt(0)
    // dotfile + 200
    if (isDotFile(nodeName)) score += 200
    // dir + 400
    if (isDir(node)) score += 400
    return score
}
/**
 * Format glob object.
 * @param {Object, String} node
 */
Formatter.prototype.format = function(node, at_end = true, leftpad = "") {
  if (typeof node === "object") {
    let dirs = "";
    dirs += leftpad + this.transform_dir(node.path, at_end);

    if (node.children.length) {
      dirs += "\n";
      dirs += node.children
        .sort((nodeA, nodeB) => {

          const nodeAScore = this.caculScore(nodeA)
          const nodeBScore = this.caculScore(nodeB)
          return nodeBScore - nodeAScore
        })
        .map((node, idx, arr) => {
          const leftpad_next =
            leftpad + (at_end ? this.leftpad_at_end : this.leftpad);
          return this.format(node, idx === arr.length - 1, leftpad_next);
        })
        .join("\n");
    }
    return dirs;
  } else {
    return leftpad + this.transform_file(node, at_end);
  }
};

exports = module.exports = function format(glob, mode) {
  return new Formatter(mode).format(glob);
};
