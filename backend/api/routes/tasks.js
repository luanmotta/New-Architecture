var Tasks    = require('../../models/tasks.js');

module.exports = function (app, dao) {

	app.get('/tasks', dao.getElement(Tasks));

	app.get('/tasks/:_id', dao.getElementById(Tasks));	

	app.post('/tasks', dao.postElement(Tasks));

	app.put('/tasks/:_id', dao.putElement(Tasks));

	app.delete('/tasks/:_id', dao.deleteElement(Tasks));

}