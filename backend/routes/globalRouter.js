const express = require('express');
const routes = require('../globals/routes.js');

const globalRouter = express.Router();

globalRouter.get(routes.root, function (req, res, next) {
  res.send('서버 확인용 라우트입니다.');
});

module.exports = globalRouter;
