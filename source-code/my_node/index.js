var server = require('./server/server');
var router = require('./server/router').route;
var requestHandlers = require('./server/requestHandlers');

var handle = {};
handle['/'] = requestHandlers.start;
handle['/start'] = requestHandlers.start;
handle['/upload'] = requestHandlers.upload;

server.start(router, handle);

