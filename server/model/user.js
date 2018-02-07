import { create } from './base'
import { Schema } from 'mongoose'

export default create('User', {
	email: {
		type: String,
		unique: true,
		regex: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
	},
	password: {
		type: String,
	},
	type: {
		type: String,
		default: 'common'
	},
	type: {
		type: String,
		default: 'password'
	}
	
})