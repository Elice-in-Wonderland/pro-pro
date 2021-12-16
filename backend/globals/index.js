const path = require('path');
const fs = require('fs');
const basename = path.basename(__filename);

modules = {};
fs.readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
    );
  })
  .forEach(file => {
    modules[file.replace('.js', '')] = require(path.join(__dirname, file));
  });

module.exports = modules;
