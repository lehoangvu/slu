import express from 'express'
import db from './lib/database'
import site from './app/site'
import customer from './app/customer'
import bodyParser from 'body-parser'

const app = express()

app.use('/loaderio-433fe63d3bdd2fb994196816c7a39bab.txt', express.static('./loaderio-433fe63d3bdd2fb994196816c7a39bab.txt'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

// app.use((req, res, next) => {
//     next();
// });

// app.use((req, res, next) => {
//     if (/\/xml$/.test(req.headers['content-type'])) {
//         req.body = parser.toJson(req.body.toString(), { object: true });
//     }
//     next();
// });
app.use(require('express-status-monitor')())

app.use('/site', site)

app.use('/customer', customer)

app.get('/', (req, res) => res.send('Hello World!'))

// app.use((err, req, res, next) => {
  // res.status(500).send('Lỗi!')
// })

app.get('*', function(req, res){
  res.status(500).send('Vào hẻm rồi bạn!');
});

const app_port = process.env.PORT || 3000

app.listen(app_port, () => {
	console.log('http://localhost:' + app_port)
})