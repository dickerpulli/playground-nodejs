'use strict'

const MongoClient = require('mongodb');
const assert = require('assert');


// docker run -d -p 27017:27017 --name some-mongo mongo --auth
// docker exec -it some-mongo mongo admin
// db.createUser({ user: 'jsmith', pwd: 'some-initial-password', roles: [ { role: "root", db: "admin" } ] });

const url = 'mongodb://jsmith:some-initial-password@localhost:27017/admin';

MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server");
  
  const users = db.collection('users');
  
  users.insert({
    firstname: 'John',
    lastname: 'Doe'
  });
  
  users.find().toArray((err, documents) => {
    console.log(documents);
  });
  
  db.close();
});
