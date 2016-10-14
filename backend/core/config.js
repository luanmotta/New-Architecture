var express    = require('express'),
    bodyParser = require('body-parser'),
    mongoose   = require('mongoose');
    database      = require('./database.js'),
    dao           = require('./dao.js'),
    routeManager  = require('./../api/route-manager.js');

module.exports = function() {

  var app = express();

  app.use(bodyParser.urlencoded({extended : true}));
  app.use(bodyParser.json());

  database(app, mongoose);
  routeManager(app, express, dao(mongoose));
 
  return app;
} 
