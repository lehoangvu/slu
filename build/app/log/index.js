'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _database = require('./../../lib/database');

var _database2 = _interopRequireDefault(_database);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();
// Home page route.
router.get('/', function (req, res) {
  res.send('Wiki home page');
});

// About page route.
router.get('/about', function (req, res) {
  res.send('About this wiki');
});

exports.default = router;