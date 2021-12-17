const { statusCode, responseMessage } = require('../globals');
const { resFormatter } = require('../utils');
const asyncHandler = require('../utils/asyncHandler');
const postService = require('../services/postService');

exports.getPost = asyncHandler(async (req, res, next) => {
  const category = req.query.category;
  const page = Number(req.query.page || 1);
  const perPage = Number(req.query.perPage || 10);
  const skipSize = (page - 1) * perPage;

  const posts = await postService.getPost(category, skipSize, perPage);

  return res
    .status(statusCode.OK)
    .send(resFormatter.success(responseMessage.SUCCESS, posts));
});

// 게시글 생성
exports.createPost = asyncHandler(async (req, res, next) => {
  // 추후에 빈 값 체크
  const {
    category,
    title,
    content,
    stacks,
    capacity,
    region: { lat, lng, address, sido },
    executionPeriod,
    registerDeadline,
  } = req.body;

  const [startDate, endDate] = executionPeriod;
  const location = {
    type: 'Point',
    coordinates: [lat, lng],
  };

  await postService.createPost({
    category,
    title,
    content,
    stacks,
    capacity,
    location,
    address,
    sido,
    startDate: new Date(startDate),
    endDate: new Date(endDate),
    registerDeadline: new Date(registerDeadline),
  });

  return res
    .status(statusCode.CREATED)
    .send(resFormatter.success(responseMessage.POST_CREATED, {}));
});

// 게시글 수정
exports.updatePost = asyncHandler(async (req, res, next) => {
  const {
    category,
    title,
    content,
    stacks,
    capacity,
    region: { lat, lng, address, sido },
    executionPeriod,
    registerDeadline,
  } = req.body;

  const { postId } = req.params;

  const [startDate, endDate] = executionPeriod;
  const location = {
    type: 'Point',
    coordinates: [lat, lng],
  };

  await postService.updatePost(postId, {
    category,
    title,
    content,
    stacks,
    capacity,
    location,
    address,
    sido,
    startDate: new Date(startDate),
    endDate: new Date(endDate),
    registerDeadline: new Date(registerDeadline),
  });

  return res
    .status(statusCode.OK)
    .send(resFormatter.success(responseMessage.POST_UPDATED, {}));
});

// 게시글 삭제
exports.deletePost = asyncHandler(async (req, res, next) => {
  const { postId } = req.params;

  await postService.deletePost(postId);

  return res
    .status(statusCode.OK)
    .send(resFormatter.success(responseMessage.POST_DELETED, {}));
});
