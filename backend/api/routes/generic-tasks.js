var GenericTasks    = require('../../models/generic-tasks.js');

module.exports = function (app, dao) {

	app.get('/generic-tasks', dao.getElement(GenericTasks));

	app.get('/generic-tasks/:_id', dao.getElementById(GenericTasks));	

	app.post('/generic-tasks', dao.postElement(GenericTasks));

	app.put('/generic-tasks/:element_id', dao.putElement(GenericTasks));

	app.delete('/generic-tasks/:element_id', dao.deleteElement(GenericTasks));

}