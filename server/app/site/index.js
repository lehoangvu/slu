import express from 'express'
import {Site, Pageview} from './../../model'
import Authen from './../../lib/authen'

var create_queue = [];
var queueTimeout = false;
var queueProcessing = false;
var router = express.Router();

router.use(Authen)

router.get('/', function (req, res) {
	let sf = Site.find({domain: 'domain-domain'})
	sf.exec((err, docs) => {
		if(docs.length > 0) {
			const site = docs[0]
			// Pageview.find().populate('site').exec((err, ps) => {
			// 	res.json(ps[0].site)
			// })
				res.json(site)

		}

	})
})

router.get('/queue', function (req, res) {
	res.json({length: create_queue.length})
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

var queueProcess = function() {
	if(queueProcessing) return;
	queueProcessing = true;
	const s = create_queue.splice(0, 1)
	if(s.length > 0) {
		s[0].save(function (err) {
		  	queueProcess()
		})
		queueProcessing = false;
	} else {
		queueProcessing = false;
	}
}

export default router;