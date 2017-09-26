const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

/**
 * Mongoose connection
 *
 * @type {MongooseThenable}
 */
module.exports.connection = mongoose.connect('mongodb://localhost/exercise', {
	'useMongoClient': true
});
