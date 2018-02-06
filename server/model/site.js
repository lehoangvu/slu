import { create } from './base'

export default create('Site', {
	domain: {
		type: String,
		required: true
	},
	name: {
		type: String,
		required: true
	},
	status: {
		type: String,
		default: 'inactive'
	},
})