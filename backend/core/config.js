var express    = require('express'),
    bodyParser = require('body-parser'),
    database      = require('./database.js'),
    routeManager  = require('./../api/route-manager.js');

module.exports = function() {

  var app = express();

  app.use(bodyParser.urlencoded({extended : true}));
  app.use(bodyParser.json());

  database(app);
  routeManager(app);
 
  return app;
} 
