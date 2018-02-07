'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _base = require('./base');

var _mongoose = require('mongoose');

exports.default = (0, _base.create)('Pageview', {
	site: {
		type: _mongoose.Schema.Types.ObjectId,
		ref: 'Site'
	}

});