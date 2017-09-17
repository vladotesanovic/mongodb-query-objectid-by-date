const faker = require('faker');

/**
 * Generate User documents which are ideal for testing
 *
 * @method generate
 *
 * @type {exports.GeneratorService}
 */
exports.GeneratorService = class GeneratorService {

	/**
	 * Generate User documents with delays
	 *
	 * @returns {[number,number,number]}
	 */
	generateFakeUsers(numberOfusers) {

		const fakeUsers = [];

		while(numberOfusers) {
			fakeUsers.push({
				'name': faker.name.findName(),
				'email': faker.internet.email(),
				'phone': faker.phone.phoneNumber(),
				'web': faker.internet.url(),
				'address': faker.address.streetName(),
				'company': faker.company.companyName()
			});

			numberOfusers--;
		}

		return fakeUsers;
	}

};
