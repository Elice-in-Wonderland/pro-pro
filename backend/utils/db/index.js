const mongoose = require('mongoose');
const config = require('../../configs/db');

const connectDB = async () => {
  try {
    await mongoose.connect(config.mongoURI, {});

    console.log('Mongoose Connected ...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
