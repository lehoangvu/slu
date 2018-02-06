'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mongoose2.default.connect('mongodb://slu:1234qwerasdfzxcv@ds125388.mlab.com:25388/sludb').then(function () {
  console.log('connect ok');
}, function (err) {
  console.log('connect fail', err);
});

exports.default = _mongoose2.default;