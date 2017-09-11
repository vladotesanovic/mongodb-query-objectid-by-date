const { connection } = require('./connection');
const mongoose = require('mongoose');
const hash = require('object-hash');

const schema = new mongoose.Schema({
	name: 'string',
	size: 'string',
	sum: 'string',
	checksum: 'string'
});

// as the second parameter if you want to use parallel middleware.
schema.post('save', async(doc) => {

	let res = doc;
	res = doc._id.toString();

	await Tank.where({ _id: doc._id }).update({
		sum: hash(res),
		checksum: mongoose.Types.ObjectId()
	});
});

const Tank = connection.model('Tank', schema);

exports.Tank = Tank;

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


