'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _authen = require('./../../lib/authen');

var _authen2 = _interopRequireDefault(_authen);

var _model = require('./../../model');

var _md = require('md5');

var _md2 = _interopRequireDefault(_md);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get('/', _authen2.default, function (req, res) {
	res.json({
		token: 'cklajshflawi'
	});
});
router.put('/tokens', function (req, res) {
	var _req$query = req.query,
	    email = _req$query.email,
	    password = _req$query.password,
	    grant_type = _req$query.grant_type;

	var errors = [];
	if (!grant_type) {
		errors.push({
			'all': 'Ops!'
		});
	}
	if (grant_type === 'password') {
		if (!email) {
			errors.push({
				'email': 'Email required!'
			});
		}
		if (!password) {
			errors.push({
				'password': 'Password required!'
			});
		}
		var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
		if (!emailRegex.test(email)) {
			errors.push({
				'email': 'Email invalid!'
			});
		}
	}
	if (errors.length === 0) {
		if (grant_type === 'password') {
			_model.User.findOne({
				email: email
			}, function (err, user) {
				if (user) {
					errors.push({
						'all': 'Email aready used'
					});
					res.status(400).json({ errors: errors });
				} else {
					var _user = new _model.User({
						email: email,
						password: (0, _md2.default)(password),
						grant_type: grant_type
					});
					_user.save().then(function () {
						res.json({
							access_token: (0, _authen.createToken)({
								id: _user.ID,
								email: _user.email
							})
						});
					});
				}
			});
		}
	} else {
		res.status(404).json({ errors: errors });
	}
});
router.get('/tokens', function (req, res) {
	var _req$query2 = req.query,
	    email = _req$query2.email,
	    password = _req$query2.password;

	var errors = [];
	if (!email) {
		errors.push({
			'email': 'Email required!'
		});
	}
	if (!password) {
		errors.push({
			'password': 'Password required!'
		});
	}
	var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
	if (!emailRegex.test(email)) {
		errors.push({
			'email': 'Email invalid!'
		});
	}
	if (errors.length === 0) {
		_model.User.findOne({
			email: email,
			password: (0, _md2.default)(password)
		}, function (err, user) {
			if (user) {
				res.json({
					access_token: (0, _authen.createToken)({
						id: user.ID,
						email: user.email
					})
				});
			} else {
				errors.push({
					'all': 'Email or password invalid!'
				});
				res.status(404).json({ errors: errors });
			}
		});
	} else {
		res.status(404).json({ errors: errors });
	}
});

exports.default = router;