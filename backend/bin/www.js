const app = require('../app.js');
const logger = require('../utils/logger.js');
const http = require('http');

//포트 노멀라이즈
var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

//서버생성
var server = http.createServer(app);

//서버 시작
server.listen(port, function () {
  logger.log(`🔥Server on! http://localhost:${port}`);
});
server.on('error', onError);
server.on('listening', onListening);

//아래는 함수들

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      logger.err(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      logger.err(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
  logger.log('Listening on ' + bind);
}
