const { Person, objectIdWithTimestamp, generateObjectId } = require('./models/items');
const { GeneratorService } = require('./services/generator.service');

(async() => {

	try {

		const generator = new GeneratorService();

		await Person.multipleInsert(generator.generateFakeUsers(3));

		// Generate 1 hour behind date
		const currentDate = generateObjectId();

		// Find all documents created after 2017/09/11
		const dateInPast = objectIdWithTimestamp('2017/09/11 16:14:00');

		console.log('Get all objects $gt ', dateInPast.getTimestamp());

		const allAfter = await Person.find({ _id: { $gt: dateInPast } });

	} catch (e) {
		console.log(e);
	}

})();

