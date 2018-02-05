const express = require('express')
const app = express()

const db = require('./lib/database')

const log = require('./app/log')

app.use('/log', log)

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(3000, () => console.log('Example app listening on port 3000!'))