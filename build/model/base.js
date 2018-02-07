'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.create = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _shortid = require('shortid');

var _shortid2 = _interopRequireDefault(_shortid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import { Schema } from 'mongoose'

var defaultSchemaOption = {
	ID: {
		type: String,
		default: function _default() {
			return _shortid2.default.generate();
		}
	},
	created_at: {
		type: Date,
		default: Date.now
	},
	updated_at: {
		type: Date,
		default: Date.now
	}
};

var create = function create(name, options) {
	var schema = new _mongoose2.default.Schema(_extends({}, defaultSchemaOption, options));
	return _mongoose2.default.model(name, schema);
};

exports.create = create;