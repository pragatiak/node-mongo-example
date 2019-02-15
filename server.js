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
mongoose.connect('mongodb://localhost:27017/listfinapp'); 


var routes = require('./api/routes/finappListRoutes'); //importing route
routes(app); //register the route
app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});



app.listen(port);
console.log('todo list RESTful API server started on: ' + port);


