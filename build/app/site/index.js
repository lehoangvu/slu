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

var create_queue = [];
var queueTimeout = false;
var queueProcessing = false;
var router = _express2.default.Router();

router.use(_authen2.default);

router.get('/', function (req, res) {
	var sf = _model.Site.find({ domain: 'domain-domain' });
	sf.exec(function (err, docs) {
		if (docs.length > 0) {
			var site = docs[0];
			// Pageview.find().populate('site').exec((err, ps) => {
			// 	res.json(ps[0].site)
			// })
			res.json(site);
		}
	});
});

router.get('/queue', function (req, res) {
	res.json({ length: create_queue.length });
});

router.put('/', function (req, res) {

	var body = req.body;

	var s = new _model.Site(_extends({}, body));

	create_queue.push(s);
	queueProcess();
	res.json({ length: create_queue.length });
	// s.save(function (err) {
	//   	if (err) {
	//   		res.json(err)
	//   	} else {
	// 	  	// saved!
	// 		res.json(s);
	//   	}
	// })
});

var queueProcess = function queueProcess() {
	if (queueProcessing) return;
	queueProcessing = true;
	var s = create_queue.splice(0, 1);
	if (s.length > 0) {
		s[0].save(function (err) {
			queueProcess();
		});
		queueProcessing = false;
	} else {
		queueProcessing = false;
	}
};

exports.default = router;