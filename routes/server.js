var express = require('express'),
  app = express(),
  port = process.env.PORT || 8888,
  mongoose = require('mongoose'),
  Finapp = require('./api/models/finappListModel'), //created model loading here
  bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//importing Script for 1st time insertion
var appScript = require('./routes/appScript'); 


mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/finappList'); 


// // Using `mongoose.connect`...
// var promise = mongoose.connect('mongodb://localhost:27017/finappList', {
//   useMongoClient: true,
//   /* other options */
// });
// // Or `createConnection`
// var promise = mongoose.createConnection('mongodb://localhost:27017/finappList', {
//   useMongoClient: true,
//   /* other options */
// });
// promise.then(function(db) {
//   /* Use `db`, for instance `db.model()`
// });
// // Or, if you already have a connection
// connection.openUri('mongodb://localhost/myapp', { /* options */ });



// Using `mongoose.connect`...
// var promise = mongoose.connect('mongodb://localhost:27017/newdb', {
//   useMongoClient: true,
//   /* other options */
// });

// Or `createConnection`
// var promise = mongoose.createConnection('mongodb://localhost:27017/newdb', {
//   useMongoClient: true,
//   /* other options */
// });
// promise.then(function(db) {
//   /* Use `db`, for instance `db.model()`
// });
// // Or, if you already have a connection
// connection.openUri('mongodb://localhost/myapp', { /* options */ });



// var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://localhost:27017/";

// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   var dbo = db.db("newdb");
//   dbo.collection("users").findOne({}, function(err, result) {
//     if (err) throw err;
//     console.log('result.name',result);
//     db.close();
//   });
// });



var routes = require('./api/routes/finappListRoutes'); //importing route
routes(app); //register the route
app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});



app.listen(port);
console.log('todo list RESTful API server started on: ' + port);


