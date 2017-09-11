const { Tank, objectIdWithTimestamp, generateObjectId } = require('./models/items');

(async() => {

	try {

		// create few Dummy object in database
		const tank = new Tank({ name: 'Zildjian', size: 10 });
		await tank.save();

		const all = await Tank.find();

		for (const obj of all) {
			console.log(obj._id.getTimestamp());
		}

		// Generate 1 hour behind date
		const currentDate = generateObjectId();

		// Find all documents created after 2017/09/11
		// objectIdWithTimestamp('2017/09/11 16:14:00')
		console.log('Get all objects $gt ', currentDate.getTimestamp());

		const allAfter = await Tank.find({ _id: { $gt: currentDate } });
		console.log(allAfter);

	} catch (e) {
		console.log(e);
	}

})();

