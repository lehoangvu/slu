'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _model = require('./../../model');

var _authen = require('./../../lib/authen');

var _authen2 = _interopRequireDefault(_authen);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.use(_authen2.default);

router.get('/', function (req, res) {
	var sf = _model.Site.find({ domain: 'https://tiki.vn' });
	sf.exec(function (err, docs) {
		if (docs.length > 0) {
			var site = docs[0];
			_model.Pageview.find().populate('site').exec(function (err, ps) {
				res.json(ps[0].site);
			});
		}
	});
});

router.put('/', function (req, res) {

	var body = req.body;

	var s = new _model.Site(_extends({}, body));

	s.save(function (err) {
		if (err) {
			res.json(err);
		} else {
			// saved!
			res.json(s);
		}
	});
});

exports.default = router;