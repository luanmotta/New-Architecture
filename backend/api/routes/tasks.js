var Tasks    = require('../../models/tasks.js');

module.exports = function (app, dao) {

	app.get('/tasks', dao.getElement(Tasks));

	app.get('/tasks/:id', dao.getElementById(Tasks));	

	app.post('/tasks', dao.postElement(Tasks));

	app.put('/tasks/:id', dao.putElement(Tasks));

	app.delete('/tasks/:id', dao.deleteElement(Tasks));

}