import express from 'express'
import Authen from './../../lib/authen'
import { createToken } from './../../lib/authen'
import {User} from './../../model'
import md5 from 'md5'

var router = express.Router();

router.get('/', Authen, (req, res) => {
	res.json({
		token: 'cklajshflawi'
	})
})
router.put('/tokens', (req, res) => {
	let { email, password, grant_type } = req.query
	let errors = [];
	if(!grant_type) {
		errors.push({
			'all': 'Ops!'
		})
	}
	if(grant_type === 'password') {
		if(!email) {
			errors.push({
				'email': 'Email required!'
			})
		}
		if(!password) {
			errors.push({
				'password': 'Password required!'
			})
		}
		const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
		if(!emailRegex.test(email)) {
			errors.push({
				'email': 'Email invalid!'
			})
		}
	}
	if(errors.length === 0) {
		if(grant_type === 'password') {
			User.findOne({
				email: email
			}, (err, user) => {
				if(user) {
					errors.push({
						'all': 'Email aready used'
					})
					res.status(400).json({errors:errors})
				} else {
					const user = new User({
						email,
						password: md5(password),
						grant_type
					})
					user.save().then(() => {
						res.json({
							access_token: createToken({
								id: user.ID,
								email: user.email
							})
						})
					})
				}
			})
		}
	} else {
		res.status(404).json({errors:errors})
	}
})
router.get('/tokens', (req, res) => {
	const { email, password } = req.query
	let errors = [];
	if(!email) {
		errors.push({
			'email': 'Email required!'
		})
	}
	if(!password) {
		errors.push({
			'password': 'Password required!'
		})
	}
	const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
	if(!emailRegex.test(email)) {
		errors.push({
			'email': 'Email invalid!'
		})
	}
	if(errors.length === 0) {
		User.findOne({
			email: email,
			password: md5(password)
		}, (err, user) => {
			if(user) {
				res.json({
					access_token: createToken({
						id: user.ID,
						email: user.email
					})
				})
			} else {
				errors.push({
					'all': 'Email or password invalid!'
				})
				res.status(404).json({errors:errors})
			}
		})
	} else {
		res.status(404).json({errors:errors})
	}
})

export default router;