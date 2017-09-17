# Excericse for querying data by ObjectID with date

Query MongoDB ObjectID by date.

## ToDo

- Generate more objects with different time span with faker module

```javascript

(async() => {

    try {

		// Find all documents created after 2017/09/11
        const dateInPast = objectIdWithTimestamp('2017/09/11 16:14:00');
        
        console.log('Get all objects $gt ', dateInPast.getTimestamp());
        
        const allAfter = await Person.find({ _id: { $gt: dateInPast } });
        console.log(allAfter);

	} catch (e) {
		console.log(e);
	}

})();

```
