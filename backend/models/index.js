const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
const basename = path.basename(__filename);

const logger = require('../utils/logger');
const configs = require('../configs');

const connectDB = async () => {
  try {
    await mongoose.connect(configs.db.mongoURI, {});
    logger.log('Mongoose 연결 성공 ...');
  } catch (err) {
    logger.err(err);
    process.exit(1);
  }
};

(async () => {
  await connectDB();
})();

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
