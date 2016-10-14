  var tasks 	   	 = require('./../api/routes/tasks.js'),
	    projects 	   = require('./../api/routes/projects.js');
			genericTasks = require('./../api/routes/generic-tasks.js');


module.exports = function (app, express, dao) {

	var router = express.Router();

	router.use(function(req, res, next) {
	    console.log('Something is happening.');
	    next();
	});

	projects(app, dao);
	genericTasks(app, dao);
  tasks(app, dao);

	app.get('/', function(req, res){
		res.send('hello world');
	});

}