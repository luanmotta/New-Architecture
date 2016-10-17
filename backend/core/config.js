var express    = require('express'),
    bodyParser = require('body-parser'),
    routeManager  = require('./../api/route-manager.js');

module.exports = function() {

  var app = express();

  app.use(bodyParser.urlencoded({extended : true}));
  app.use(bodyParser.json());

  routeManager(app);
 
  return app;
} 
