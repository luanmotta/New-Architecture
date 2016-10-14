var Tasks    = require('../../models/tasks.js');

module.exports = function (app, dao) {

	app.get('/tasks', function(req, res) {
		dao.getElement(Tasks, (r) => res.send(r));
	});

	app.get('/tasks/:element_id', function(req, res) {
		dao.getElementById(Tasks, (r) => res.send(r), req.params.element_id);
	});

	app.post('/tasks', function(req, res) {
		dao.getElement(Tasks, () => res.send("Task Criada"));
	});

}