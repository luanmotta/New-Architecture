var Tasks           = require('../../models/tasks.js'),
    Projects        = require('../../models/projects.js'),
  	GenericTasks    = require('../../models/generic-tasks.js');


module.exports = function (app, dao) {

	app.get('/projects', dao.getElement(Projects));	

	app.get('/projects/:_id', function (req, res) {

		Projects.findById(req.params._id, function(err1, p) {

			if (err1) {	res.status(500).send(err1); return; }

			Tasks.find( { project_id : req.params._id } , function(err2, t) {

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

			var insertTaskArray = (t, reqLength) => {
				var position = t.generic_id;
				auxTasksArray[position-1] = t;
				if (cont == reqLength) { 
					var tasksArray = auxTasksArray.filter(item => item);
					res.status(201).json({"Project" : p, "Tasks" : tasksArray});
				}
				cont++;
			};

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

							insertTaskArray(t, req.body.length);

						});

					});
				}
			});
		});
	});

	app.put('/projects/:_id', dao.putElement(Projects));

	app.delete('/projects/:_id', dao.deleteElement(Projects));

}