'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.createToken = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SECRECT = 'ahii';

var authen = function authen(req, res, next) {
	var access_token = req.body.access_token || req.query.access_token || req.headers['x-access-token'];
	if (access_token) {
		_jsonwebtoken2.default.verify(access_token, SECRECT, function (err, decoded) {
			if (err) {
				return res.status(404).json({ error: 'Failed to authenticate token.' });
			} else {
				req.token_decoded = decoded;
				next();
			}
		});
	} else {
		res.status(404).json({
			error: 'Access token required'
		});
	}
};

var createToken = function createToken(payload) {
	var ops = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	return _jsonwebtoken2.default.sign(payload, SECRECT, _extends({}, ops));
};

exports.createToken = createToken;
exports.default = authen;