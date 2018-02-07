import express from 'express'
import db from './lib/database'
import site from './app/site'
import customer from './app/customer'
import bodyParser from 'body-parser'

const app = express()

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

app.get('*', function(req, res){
  res.send('Vào hẻm rồi bạn!', 404);
});

app.listen(process.env.PORT || 3000, () => console.log('Example app listening on port 3000!'))