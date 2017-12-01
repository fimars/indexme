const basename = require("path").basename;

const transforms = {
  ["markdown"]: {
    dir: leftpadByDeep(2, function(filepath) {
      return `- ${basename(filepath)}`;
    }),
    file: leftpadByDeep(2, function(filepath) {
      return `- [${basename(filepath)}](${filepath})`;
    })
  },
  ["pure"]: {
    dir: leftpadByDeep(2, function(filepath) {
      return `- ${basename(filepath)}/`;
    }),
    file: leftpadByDeep(2, function(filepath) {
      return `${basename(filepath)}`;
    })
  },
  ["tree"]: {
    file: leftpadByDeep(4, function(filepath, last) {
      return `${last ? '└' : '├'}── ${basename(filepath)}`;
    }),
    dir: leftpadByDeep(4, function(filepath, last) {
      return `└── ${basename(filepath)}`;
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
