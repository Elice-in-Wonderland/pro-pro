const { statusCode, responseMessage } = require('../globals');
const { resFormatter } = require('../utils');
const asyncHandler = require('../utils/asyncHandler');
const postService = require('../services/postService');

// 새 글 작성
exports.createPost = asyncHandler(async (req, res, next) => {
  // 디비에 맞는 전처리
  const {
    category,
    title,
    content,
    stacks,
    capacity,
    region,
    executionPeriod,
    registerDeadline,
  } = req.body;

  const [startDate, endDate] = executionPeriod;
  const { lat, lng, address } = region;
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
    startDate: new Date(startDate),
    endDate: new Date(endDate),
    registerDeadline: new Date(registerDeadline),
  });

  return res
    .status(statusCode.CREATED)
    .send(resFormatter.success(responseMessage.POST_CREATED, {}));
});
