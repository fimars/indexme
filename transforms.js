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
      return `${last ? '└' : '├'}── ${basename(filepath)}`;
    },
    prefix: '│   ',
    prefix_last: '    '
  },
};

function leftpadByDeep(n, fn) {
  return function(filepath, deep, last) {
    return `${leftpad(deep, n)}${fn(filepath, last)}`
  }
}

function leftpad(deep, n) {
  return " ".repeat(deep * n);
}


exports = module.exports = transforms;
