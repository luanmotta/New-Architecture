var Tasks           = require('../../models/tasks.js'),
    Projects        = require('../../models/projects.js'),
	GenericTasks    = require('../../models/generic-tasks.js');

module.exports = function (app, dao) {

	app.get('/projects', function (req, res) {
		dao.getElement(Projects, (r) => res.send(r));
	});	

	app.get('/projects/:element_id', function (req, res) {
		dao.getElementById(Projects, function(p) {

			dao.getElement(Tasks, function(t) {

				res.json({"Project" : p, "Tasks" : t});

			}, { project_id : p.project_id });

		}, req.params.element_id);
	});
/*
	app.post('/projects', function (req, res) {
		dao.putProject(Projects, Tasks, GenericTasks)
	});

	app.put('/projects/:element_id', function (req, res) {
		dao.getProject(Projects, Tasks)
	});

	app.delete('/projects/:element_id', function (req, res) {
		dao.getProject(Projects, Tasks)
	});
*/

}