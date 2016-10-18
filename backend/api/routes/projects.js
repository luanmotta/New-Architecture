var Tasks           = require('../../models/tasks.js'),
    Projects        = require('../../models/projects.js'),
  	GenericTasks    = require('../../models/generic-tasks.js');


module.exports = function (app, dao) {

	app.get('/projects', dao.getElement(Projects));	

	app.get('/projects/:id', function (req, res) {

		Projects.findById(req.params.id, function(err1, p) {

			if (err1) {	res.status(500).send(err1); return; }

			Tasks.find( { project_id : req.params.id } , function(err2, t) {

				if (err2) {	res.status(500).send(err2); return; }
				res.status(200).json({"Project" : p, "Tasks" : t});			

			});		
		});
	});


	app.post('/projects', function (req, res) {

		Projects.create(req.body[0], function(err, p) {

			if (err) {res.status(500).send(err); return;}
			
			var auxTasksArray = [];
			var cont = 2;

			req.body.forEach(function (item, index) {

				if (index > 0) {

					GenericTasks.find({ generic_id : item }, function(err2, gt) {

						if (err2) {res.status(500).send(err2); return;}

						var taskObject = {
							name : gt[0].name,
							generic_id : gt[0].generic_id,
							project_id : p._id
						};
						
						Tasks.create(taskObject, function(err2, t) {

							if (err2) {res.status(500).send(err2); return;}

							var position = t.generic_id;
							auxTasksArray[position-1] = t;
							if (cont == req.body.length) { 
								var tasksArray = auxTasksArray.filter(item => item);
								res.status(201).json({"Project" : p, "Tasks" : tasksArray});
							}
							cont++;

						});

					});
				}
			});
		});
	});

	app.put('/projects/:id', dao.putElement(Projects));

	app.delete('/projects/:id', dao.deleteElement(Projects));

}