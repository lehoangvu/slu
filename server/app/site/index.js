import express from 'express'
import {Site, Pageview} from './../../model'


// const s = new Site({
// 	domain: 'tiki.com.vn',
// 	name: 'Tiki',
// 	status: 'active'
// })

// s.save(function (err) {
//   if (err) return handleError(err);
//   // saved!
// })

var router = express.Router();

router.get('/', function (req, res) {
	let sf = Site.find({domain: 'https://tiki.vn'})
	sf.exec((err, docs) => {
		if(docs.length > 0) {
			const site = docs[0]
			Pageview.find().populate('site').exec((err, ps) => {
				console.log(ps)
				res.json(ps[0].site)
			})
	// 		let p = new Pageview({
	// 			site: site
	// 		})
	// 		p.save(function (err) {
	// 		  	if (err) {
	// 		  		res.json(err)
	// 		  	} else {
	// 			  	// saved!
	// 				res.json(p);
	// 		  	}
	// 		})

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