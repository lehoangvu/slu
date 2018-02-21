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


const create = (name, options, plugins = []) => {
	const schema = new mongoose.Schema({
		...defaultSchemaOption,
		...options
	})

	schema.set('toJSON', { transform: (doc, ret, options) => { 
		delete ret.__v;
		delete ret._id;
		return ret; 
	}});

	plugins.map(plugin => schema.plugin(plugin))
	
	return mongoose.model(name, schema)
}

export {
	create
}