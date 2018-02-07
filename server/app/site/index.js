import express from 'express'
import {Site, Pageview} from './../../model'
import Authen from './../../lib/authen'


var router = express.Router();

router.use(Authen)

router.get('/', function (req, res) {
	let sf = Site.find({domain: 'https://tiki.vn'})
	sf.exec((err, docs) => {
		if(docs.length > 0) {
			const site = docs[0]
			Pageview.find().populate('site').exec((err, ps) => {
				res.json(ps[0].site)
			})

		}

	})
})

router.put('/', function (req, res) {

	const body = req.body;

	const s = new Site({
		...body
	})

	s.save(function (err) {
	  	if (err) {
	  		res.json(err)
	  	} else {
		  	// saved!
			res.json(s);
	  	}
	})

})

export default router;