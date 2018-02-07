'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _base = require('./base');

var _mongoose = require('mongoose');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

exports.default = (0, _base.create)('User', _defineProperty({
	email: {
		type: String,
		unique: true,
		regex: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
	},
	password: {
		type: String
	},
	type: {
		type: String,
		default: 'common'
	}
}, 'type', {
	type: String,
	default: 'password'
}));