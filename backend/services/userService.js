const userModel = require('../models/user');

exports.isExistSnsId = async (snsType, snsId) => {
  const user = await userModel.findOne({
    snsType,
    snsId,
  });

  return user;
};

exports.snsSignUp = async data => {
  const user = await userModel.create(data);

  return user;
};

exports.checkUser = async userId => {
  const alreadyUser = await userModel.findOne({
    _id: userId,
  });
  return alreadyUser;
};
