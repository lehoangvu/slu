import express from 'express'
import Authen from './../../lib/authen'

var router = express.Router();

router.get('/', Authen, (req, res) => {
	res.json({
		token: 'cklajshflawi'
	})
})
router.get('/tokens', (req, res) => {
	res.json({
		token: 'cklajshflawi'
	})
})

export default router;