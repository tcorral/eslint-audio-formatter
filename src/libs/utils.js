var fs = require('fs');

function Utils() {}

Utils.prototype = {
  getUnique: function(array) {
    var u = {}, a = [];
    for (var i = 0, l = array.length; i < l; ++i) {
      if (u.hasOwnProperty(array[i])) {
        continue;
      }
      a.push(array[i]);
      u[array[i]] = 1;
    }
    return a;
  },
  traverse: function traverse(node, func) {
    var key,
      child;
    func(node);
    for (key in node) {
      if (node.hasOwnProperty(key)) {
        child = node[key];
        if (typeof child === 'object' && child !== null) {
          if (Array.isArray(child)) {
            child.forEach(function(node) {
              traverse(node, func);
            });
          } else {
            traverse(child, func);
          }
        }
      }
    }
  },
  requireAllExtensions: function(extensionsPath, extensions) {
    fs.readdirSync(extensionsPath).forEach(function(file) {
      extensions.push(require(extensionsPath + '/' + file));
    });
  },
  addStatsEntry: function(stats, name, defaultData) {
    if (!stats[name]) {
      stats[name] = defaultData
    }
  }
};

module.exports = new Utils();
