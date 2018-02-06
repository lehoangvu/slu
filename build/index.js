'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _database = require('./lib/database');

var _database2 = _interopRequireDefault(_database);

var _log = require('./app/log');

var _log2 = _interopRequireDefault(_log);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

app.use('/log', _log2.default);

app.get('/', function (req, res) {
  return res.send('Hello World!');
});

app.listen(3000, function () {
  return console.log('Example app listening on port 3000!');
});