'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _database = require('./lib/database');

var _database2 = _interopRequireDefault(_database);

var _site = require('./app/site');

var _site2 = _interopRequireDefault(_site);

var _customer = require('./app/customer');

var _customer2 = _interopRequireDefault(_customer);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

app.use('/loaderio-433fe63d3bdd2fb994196816c7a39bab.txt', _express2.default.static('./loaderio-433fe63d3bdd2fb994196816c7a39bab.txt'));

app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: true }));

// app.use((req, res, next) => {
//     next();
// });

// app.use((req, res, next) => {
//     if (/\/xml$/.test(req.headers['content-type'])) {
//         req.body = parser.toJson(req.body.toString(), { object: true });
//     }
//     next();
// });
app.use(require('express-status-monitor')());

app.use('/site', _site2.default);

app.use('/customer', _customer2.default);

app.get('/', function (req, res) {
  return res.send('Hello World!');
});

app.get('*', function (req, res) {
  res.send('Vào hẻm rồi bạn!', 404);
});

app.listen(process.env.PORT || 3000, function () {
  return console.log('Example app listening on port 3000!');
});