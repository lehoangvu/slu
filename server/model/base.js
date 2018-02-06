import mongoose from 'mongoose'
import shortid from 'shortid'
// import { Schema } from 'mongoose'

const defaultSchemaOption = {
	ID: {
		type: String,
		default: () => {
			return shortid.generate()
		}
	},
	created_at: {
		type: Date,
		default: Date.now
	},
	updated_at: {
		type: Date,
		default: Date.now
	},
}

const create = (name, options) => {
	const schema =  new mongoose.Schema({
		...defaultSchemaOption,
		...options
	})
	return mongoose.model(name, schema)
}

export {
	create
}