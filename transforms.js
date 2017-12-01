const path = require("path");

const transforms = {
  ["markdown"]: {
    dir: leftpadByDeep(2, function(filepath) {
      return `- ${path.basename(filepath)}`;
    }),
    file: leftpadByDeep(2, function(filepath) {
      return `- [${path.basename(filepath)}](${filepath})`;
    })
  },
  ["pure"]: {
    dir: leftpadByDeep(2, function(filepath) {
      return `- ${path.basename(filepath)}/`;
    }),
    file: leftpadByDeep(2, function(filepath) {
      return `${path.basename(filepath)}`;
    })
  },
  ["tree"]: {
    uiversal: leftpadByDeep(4, function(filepath, last) {
      return `${last ? '└' : '├'}── ${path.basename(filepath)}`;
    })
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
