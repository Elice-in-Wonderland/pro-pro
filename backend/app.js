const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const { logger, resFormatter } = require('./utils');
const { statusCode, routes, responseMessage } = require('./globals');

const globalRouter = require('./routes/globalRouter');
const postRouter = require('./routes/postRouter');

const { NoPageError } = require('./utils/errors/commonError');

const connectDB = require('./utils/db');

//DB연결
connectDB();

//서버 사전작업
const app = express();

//미들웨어 설정
app.use(cors());
app.use(
  helmet({
    contentSecurityPolicy: false,
  }),
);
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//라우터 설정
app.use(routes.root, globalRouter);
app.use(routes.post, postRouter);

// 아래는 에러 핸들링 함수들
app.use(function (req, res, next) {
  throw new NoPageError();
});

app.use(function (err, req, res, next) {
  let errCode = err.status || statusCode.INTERNAL_SERVER_ERROR;
  let message =
    errCode === statusCode.INTERNAL_SERVER_ERROR
      ? responseMessage.INTERNAL_SERVER_ERROR
      : err.message;

  if (req.app.get('env') === 'development') logger.err(err);

  return res.status(errCode).send(resFormatter.fail(message));
});

module.exports = app;
