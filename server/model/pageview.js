import { create } from './base'
import { Schema } from 'mongoose'

export default create('Pageview', {
	site: {
		type: Schema.Types.ObjectId,
		ref: 'Site'
	},
	
})