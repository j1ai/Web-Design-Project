var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');


// Connection URL
var url = 'mongodb://localhost:27017/csc309';

var insertDocuments = function(db, callback) {
  // Get the documents collection
  var collection = db.collection(collection_name);
  // Insert some documents
  collection.insertMany([
    {a : 1}, {a : 2}, {a : 3}
  ], function(err, result) {
    assert.equal(err, null);
    assert.equal(3, result.result.n);
    assert.equal(3, result.ops.length);
    console.log("Inserted 3 documents into the collection");
    callback(result);
  });
}

var findDocuments = function(db, query, callback) {
  // Get the documents collection
  var collection = db.collection(collection_name);
  // Find some documents
  collection.find(query).toArray(function(err, docs) {
    assert.equal(err, null);
    console.log("Found the following records");
    console.log(docs);
    callback(docs);
  });
}




var find_all_doc = function(){
    // Use connect method to connect to the server
    MongoClient.connect(url, function(err, db) {
      assert.equal(null, err);
      console.log("Connected successfully to server");

      query = {}
      findDocuments(db, query,function(docs) {
        db.close();
      });
    });
}



const db = (function() {




    // Connection URL
    var url = 'mongodb://localhost:27017/csc309';
    collection_name = 'admin'

    // let database = {
    //     'CSC309': {
    //         id: 'CSC309',
    //         when: new Date(),
    //         what: 'Programming on the Web',
    //         who: 'Gonzalez'
    //     }
    // };

    return { // public interface to the DB layer
        findAll: function() {

            return database
        },
        findOne: function(i) {
            return database[i]
        },
        add: function(r) {
            database[r.id] = r
        },
        remove: function(i) {
            delete database[i]
        }
    };
})();


module.exports = module_package

if (typeof require != 'undefined' && require.main==module) {
    module_package.find_all_doc
    // find_all_doc()



    // // Use connect method to connect to the server
    // MongoClient.connect(url, function(err, db) {
    //   assert.equal(null, err);
    //   console.log("Connected successfully to server");
    //
    //   findDocuments(db, function(docs) {
    //     db.close();
    //   });
    //
    //   // insertDocuments(db, function() {
    //   //   db.close();
    //   // });
    //   // db.close();
    // });

}
