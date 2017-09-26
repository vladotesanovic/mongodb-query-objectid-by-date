const { connection } = require('../services/connection');
const mongoose = require('mongoose');
const uuid = require('node-uuid');

// Mongoose docs schema
// http://mongoosejs.com/docs/schematypes.html

const propertySchema = new mongoose.Schema({
	guid: {
		type: String,
		required: true,
		unique: true
	},
	value: 'string',
	key: {
		type: String,
		required: true,
		unique: true
	}
});

const singleSchema = new mongoose.Schema({
	guid: {
		type: String,
		required: true,
		unique: true,
		validate: {
			validator: function (v) {
				return true;
				// return /\d{3}-\d{3}-\d{4}/.test(v);
			},
			message: '{VALUE} is not a valid GUID!'
		},
	},
	date: {
		type: Date,
		default: Date.now
	},
	type: {
		type: String,
		required: true,
		match: /^instance$/,
		default: 'instance'
	},
	system: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Single'
	},
	propertyInfo: [propertySchema]
});

const Single = connection.model('Single', singleSchema, 'single');

exports.Single = Single;

//
// Type Schema
//
const typeSchema = new mongoose.Schema({
	guid: {
		type: String,
		required: true,
		unique: true,
		validate: {
			validator: function (v) {
				return true;
				// return /\d{3}-\d{3}-\d{4}/.test(v);
			},
			message: '{VALUE} is not a valid GUID!'
		},
	},
	date: {
		type: Date,
		default: Date.now
	},
	type: {
		type: String,
		required: true,
		match: /^type$/,
		default: 'type'
	},
	propertyInfo: [propertySchema]
});

typeSchema.static('getWithInstances', async function () {

	const items = await this.find({type: 'type'}).lean().exec();

	const __ = items.map(async (item) => {
		const test = await Single.find({system: item['_id']}).lean().exec();

		return Object.assign({}, item, {
			instances: test
		})
	});

	return Promise.all(__);
});

const Type = connection.model('Single', typeSchema, 'single');

exports.Type = Type;
