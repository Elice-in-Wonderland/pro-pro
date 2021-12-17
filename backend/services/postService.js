const postModel = require('../models/post');

// 게시글 목록
exports.getPost = async (category, skipSize, perPage) => {
  let posts = await postModel
    .find({ category })
    .sort({ createdAt: -1 })
    .skip(skipSize)
    .limit(perPage);

  posts = posts.map(post => {
    const restructuredPost = {
      _id: post._id,
      category: post.category,
      title: post.title,
      recruitmentStatus: post.recruitmentStatus,
      stacks: post.stacks,
      sido: post.sido || '온라인',
      capacity: post.capacity,
      marks: post.marks,
      views: post.views,
      createdAt: post.createdAt,
      registerDeadline: post.registerDeadline,
    };
    return restructuredPost;
  });

  return posts;
};

// 게시글 생성
exports.createPost = async data => {
  const post = await postModel.create(data);

  return post;
};

// 게시글 수정
exports.updatePost = async (postId, data) => {
  const post = await postModel.findOneAndUpdate({ _id: postId }, data, {
    new: true,
  });

  return post;
};

// 게시글 삭제
exports.deletePost = async postId => {
  const post = await postModel.deleteOne({ _id: postId });

  return post;
};
