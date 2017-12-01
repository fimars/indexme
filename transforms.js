const path = require("path");

const transforms = {
  ["markdown"]: {
    dir: function(filepath) {
      return `- ${path.basename(filepath)}`;
    },
    file: function(filepath) {
      return `- [${path.basename(filepath)}](./${filepath})`;
    }
  },
  ["pure"]: {
    uiversal: function(filepath) {
      return `${path.basename(filepath)}`;
    }
  }
};

exports = module.exports = transforms;
