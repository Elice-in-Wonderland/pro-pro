const userModel = require('../models/user');
const bookmarkModel = require('../models/bookmark');

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

// 북마크 추가
exports.createBookmark = async (authorId, postId) => {
  await bookmarkModel.create({
    authorId: { _id: authorId },
    postId: { _id: postId },
  });

  const bookmarkCount = await bookmarkModel
    .countDocuments({
      postId: { _id: postId },
    })
    .exec();

  return bookmarkCount;
};

// 북마크 삭제
exports.deleteBookmark = async (authorId, postId) => {
  await bookmarkModel.deleteOne({
    $and: [
      {
        authorId: { _id: authorId },
        postId: { _id: postId },
      },
    ],
  });

  const bookmarkCount = await bookmarkModel
    .countDocuments({
      postId: { _id: postId },
    })
    .exec();

  return bookmarkCount;
};
