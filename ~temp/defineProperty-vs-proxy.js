[
  'json',
  'urlencoded',
  'bodyParser',
  'compress',
  'cookieSession',
  'session',
  'logger',
  'cookieParser',
  'favicon',
  'responseTime',
  'errorHandler',
  'timeout',
  'methodOverride',
  'vhost',
  'csrf',
  'directory',
  'limit',
  'multipart',
  'staticCache',
].forEach(function (name) {
  Object.defineProperty(exports, name, {
    get: function () {
      throw new Error(
        'Most middleware (like ' +
          name +
          ') is no longer bundled with Express and must be installed separately. Please see https://github.com/senchalabs/connect#middleware.',
      );
    },
    configurable: true,
  });
});

/* 2 */

var target = function () {
  return 'I am the target';
};
var handler = {
  apply: function () {
    return 'I am the proxy';
  },
};

var p = new Proxy(target, handler);

p();
console.log('p(): ', p());

// "I am the proxy"
// http://es6.ruanyifeng.com/#docs/proxy1
