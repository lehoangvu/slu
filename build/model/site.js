'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _base = require('./base');

exports.default = (0, _base.create)('Site', {
	domain: {
		type: String,
		required: true
	},
	name: {
		type: String,
		required: true
	},
	status: {
		type: String,
		default: 'inactive'
	}
});