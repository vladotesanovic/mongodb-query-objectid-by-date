const { connection } = require('./connection');
const mongoose = require('mongoose');
const objectHash = require('object-hash');

const schema = new mongoose.Schema({
	name: 'string',
	email: 'string',
	company: 'string',
	address: 'string',
	phone: 'string',
	web: 'string',
	checksum: 'string',
	hash: 'string'
});

// Only triggers after single item is saved
schema.post('save', async(doc) => {

	await Person.where({ _id: doc._id }).update({
		checksum: mongoose.Types.ObjectId()
	});
});

schema.statics.multipleInsert = (docs) => {

	docs.forEach((item) => {
		item.checksum = mongoose.Types.ObjectId();
		// item.hash = objectHash(removeIDFromObject(item));
	});

	return Person.insertMany(docs);
};

schema.statics.multipleUpdate = (docs) => {

	// @TODO
};

const Person = connection.model('Person', schema);

exports.Person = Person;

/**
 * Generate ObjectID based on passed timestamp
 *
 * @param timestamp
 * @returns {mongoose.Types.ObjectId}
 */
exports.objectIdWithTimestamp = (timestamp) => {

	// Convert string date to Date object (otherwise assume timestamp is a date)
	if (typeof(timestamp) === 'string') {
		timestamp = new Date(timestamp);
	}

	return generateObjectIDBasedOnDate(timestamp);
};

/**
 * Generate ObjectID with date set to -1 h
 *
 * @returns {mongoose.Types.ObjectId}
 */
exports.generateObjectId = () => {

	// set Hours to 1 hour less
	const date = new Date();
	date.setHours(date.getHours() - 1);

	return generateObjectIDBasedOnDate(date);
};

function generateObjectIDBasedOnDate(date) {

	// Convert date object to hex seconds since Unix epoch
	const hexSeconds = Math.floor(date/1000).toString(16);

	// Create an ObjectId with that hex timestamp
	return mongoose.Types.ObjectId(hexSeconds + "0000000000000000");
}

function removeIDFromObject(object) {
	const newObject = {};

	Object.keys(object).filter(key => key !== '_id').forEach((key) => {
		Object.assign(newObject, {
			[key]: object[key]
		})
	});

	return newObject;
}
