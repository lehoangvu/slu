import { create } from './base'
// import paginate from 'mongoose-paginate';
import paginate from '../lib/paginate-plugin'

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
}, [paginate])