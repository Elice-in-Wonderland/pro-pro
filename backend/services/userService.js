const userModel = require('../models/user');

// 회원 존재 여부 (By snsId, snsType)
exports.isExistSnsId = async (snsType, snsId) => {
  const user = await userModel.findOne({
    snsType,
    snsId,
  });

  return user;
};

// 회원 정보 저장
exports.snsSignUp = async data => {
  const user = await userModel.create(data);

  return user;
};

// 회원 존재 여부 (By userId)
exports.checkUser = async userId => {
  const user = await userModel.findOne({
    _id: userId,
  });
  return user;
};
