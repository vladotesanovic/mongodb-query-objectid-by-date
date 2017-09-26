const { Single, Type } = require('./models/single');
const uuid = require('node-uuid');
const faker = require('faker');

(async() => {

	try {

		// INSERT DOCUMENTS IN DATABASE

		const type = await Type.create({
			guid: uuid.v4(),
			type: 'type',
			propertyInfo: [{
				guid: uuid.v4(),
				value: '10',
				key: faker.database.column()
			}]
		});

		const instance = await Single.create({
			guid: uuid.v4(),
			type: 'instance',
			system: type['_id'],
			propertyInfo: [{
				guid: uuid.v4(),
				value: faker.random.word(),
				key: faker.database.column()
			}]
		});

		// console.log(type, instance);
		const allInstancesWithType = await Single.find({ type: 'instance' }).populate('system');
		const allTypes = await Type.find({ type: 'type' }).populate('system');

		const allTypesWithInstances = await Type.getWithInstances();

		for (const item of allTypesWithInstances) {
			console.log(item);
		}

	} catch (e) {
		console.log(e);
	}

})();
