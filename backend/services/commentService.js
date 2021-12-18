const commentModel = require('../models/comment');
const deepCopyObject = require('../utils/deepCopyObject');

// 댓글 생성
exports.createComment = async data => {
  const comment = await commentModel.create(data);

  return comment;
};

// 댓글 수정
exports.updateComment = async (commentId, data) => {
  const comment = await commentModel.findOneAndUpdate(
    { _id: commentId },
    data,
    { new: true },
  );

  return comment;
};

// 댓글 삭제
exports.deleteComment = async commentId => {
  const comment = await commentModel.deleteOne({ _id: commentId });

  return comment;
};

// 댓글 목록 가져오기
exports.getComments = async postId => {
  let comments = await commentModel.find({
    parentType: 'post',
    parentId: postId,
  });

  comments = deepCopyObject(comments);

  // getNestedComments
  await Promise.all(
    comments.map(async comment => {
      comment.nestedComments = await this.getNestedComments(comment._id);
    }),
  );

  return comments;
};

// 대댓글 목록 가져오기
exports.getNestedComments = async commentId => {
  const comments = await commentModel.find({
    parentType: 'comment',
    parentId: commentId,
  });
  return comments;
};
