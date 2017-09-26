# Querying data by ObjectID with date

Query MongoDB ObjectID by date.

```javascript

// src/app.js

(async() => {

try {

  const dateInPast = objectIdWithTimestamp('2017/09/11 16:14:00');
    
  console.log('Get all objects $gt ', dateInPast.getTimestamp());
    
  const allAfter = await Person.find({ _id: { $gt: dateInPast } });
  console.log(allAfter);

} catch (e) {
  console.log(e);
}

})();

```

Instance - Type structure in MongoDB in same collection.

```javascript

// src/single.js

(async() => {

try {
    
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

```
