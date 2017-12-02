const basename = require("path").basename;

const transforms = {
  ["markdown"]: {
    dir: function(filepath) {
      return `- ${basename(filepath)}`;
    },
    file: function(filepath) {
      return `- [${basename(filepath)}](${filepath})`;
    }
  },
  ["pure"]: {
    dir: function(filepath) {
      return `- ${basename(filepath)}/`;
    },
    file: function(filepath) {
      return `${basename(filepath)}`;
    }
  },
  ["tree"]: {
    uiversal: function(filepath, last) {
      return `${last ? "└" : "├"}── ${basename(filepath)}`;
    },
    leftpad: "│   ",
    leftpad_at_end: "    "
  }
};

exports = module.exports = transforms;
