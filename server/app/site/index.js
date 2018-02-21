import express from 'express'
import {Site, Pageview} from './../../model'
import Authen from './../../lib/authen'

const DEFAULT_LIMIT = 20

var router = express.Router();

router.use(Authen)

router.get('/', function (req, res) {
	let paging = {page: parseInt(req.query.page || 1), limit: parseInt(req.query.limit || DEFAULT_LIMIT)}
	let query = {domain: {
		"$regex": req.query.q,
		"$options": "i"
	}}
	let sf = Site.paginate(query, paging, (err, results) => {
		if(err) {
			res.status(400).json({
				error: 'Có lỗi sảy ra',
				err
			})
		} else {
			res.json(results)
		}

	})
})

router.put('/', function (req, res) {

	const body = req.body;

	const s = new Site({
		...body
	})

	create_queue.push(s);
	queueProcess()
	res.json({length: create_queue.length});
	// s.save(function (err) {
	//   	if (err) {
	//   		res.json(err)
	//   	} else {
	// 	  	// saved!
	// 		res.json(s);
	//   	}
	// })

})


export default router;