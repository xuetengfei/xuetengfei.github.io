const fs = require('fs');
const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const mysql = require('mysql');
// const csurf = require('csurf');

const {
  affixionRequestTime,
  logErrors,
  clientErrorHandler,
  errorHandler,
  validateCookies,
} = require('./appMiddleware');

const app = express();
const dog = require('./control/dog');

/* 使用中间件 */
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, 'log/access.log'),
  {
    flags: 'a',
    encoding: 'utf8',
  },
);
app.use(bodyParser.json());
app.use(morgan('combined', { stream: accessLogStream })); // logger
app.use(cookieParser()); // 解析cookie
app.use(methodOverride());
app.use(affixionRequestTime);
app.use(validateCookies);

/* 路由处理程序 */
app.use('/dog', dog);

app.get('/test', function (req, res) {
  res.send({
    requestTime: req.requestTime,
  });
});

app.get('/broken', function (req, res) {
  throw new Error('BROKEN'); // Express will catch this on its own.
});

app.get('/broken2', function (req, res, next) {
  fs.readFile('/file-does-not-exist', function (err, data) {
    if (err) {
      next(err); // Pass errors to Express.
    } else {
      res.send(data);
    }
  });
});

// app.get('*', function (req, res) {
//   console.log('hit:*');
//   res.status(404).json({ message: '404' });
// });

// app.get('*', function (req, res, next) {
//   console.log('hit:*');
//   res.status(301).redirect('/not-found');
// });

app.get('*', function (req, res, next) {
  const error = new Error();
  error.statusCode = 301;
  error.reson = `${req.ip} tried to access ${req.originalUrl}`;
  next(error);
});

app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'xxx',
  password: 'xxx',
  database: 'my_db',
});

// connection.connect();
// connection.query('SELECT 1 + 1 AS solution', function (err, rows, fields) {
//   if (err) throw err;
//   console.log('The solution is: ', rows[0].solution);
// });

// connection.end();

const server = app.listen(4444, function () {
  console.log('start in 4444');
});

process.on('SIGTERM', () => {
  debug('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    debug('HTTP server closed');
  });
});
