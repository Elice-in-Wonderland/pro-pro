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

// 프로필 정보 수정
exports.updateUser = async (userId, data) => {
  const user = await userModel.findOneAndUpdate({ _id: userId }, data, {
    new: true,
  });
  return user;
};

// 유저 닉네임 중복 체크
exports.isExistNickname = async nickname => {
  const user = await userModel.findOne({
    nickname,
  });

  return user;
};
