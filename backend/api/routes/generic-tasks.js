var GenericTasks    = require('../../models/generic-tasks.js');

module.exports = function (app, dao) {

	app.get('/generic-tasks', function (req, res) {
		dao.getElement(GenericTasks, (r) => res.send(r));
	});	

	app.post('/generic-tasks', function (req, res) {
		dao.getElement(GenericTasks, (r) => res.send(r), req.body);
	});

}