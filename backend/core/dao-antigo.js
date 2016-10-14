module.exports = function(mongoose) {

	var dao = {};

	dao.getAllElements = function (Element) {
		return function (req, res) {
			Element.find(function(err, model) {
				if (err) {
					res.send(err);
				} 
				res.json(model);
	    });
		};
	}; 

	dao.getElementsFromCategory = function (Element) {
		return function(req, res) {
			Element.find( { category_id : req.params.element_id } , function(err, model) {
				if (err) {
					res.send(err);
				}
				res.json(model);
			});
		};
	};

	dao.putElement = function (Element) {
		return function(req, res) {

			var model = new Element();

			Element.create(req.body, function (err) {
				if (err) {
					res.send(err);
				} else {
					res.json({ message: 'Element created' });
				}  
			});
		};
	};

	

	dao.postElement = function(Element) {
		return function(req, res) {
			Element.findByIdAndUpdate(req.params.element_id, req.body, function(err, model) {
				if (err) {
					res.send(err);
				}			
				res.json({ message: 'Element updated' });
			});
		};	
	};


	dao.deleteElement = function(Element) {
		return function(req, res) {
			Element.remove({
				_id: req.params.element_id
			}, function(err, model) {
				if (err) {
					res.send(err);
				}
				res.json({ message: 'Element deleted' });
			});
		};
	};

	dao.getElementById = function (Element) {
		return function(req, res) {
			Element.findById(req.params.element_id, function(err, model) {
				if (err) {
					res.send(err);
				}
				res.json(model);
			});
		};
	};




	dao.putProject = function (Project, Task, GenericTasks) {
		return function(req, res) {

			var projectModel = new Project();

			var request = req.body;

			var error;

			Project.create(request[0], function (err) {
				if (err) {
					res.send(err);
					error = 1;
				}  
			});

			request.forEach(function (item, index) {
				if (index > 0) {
					var taskModel = new Task();

					GenericTasks.find( { generic_id : item } , function(err, model) {
						if (err) {
							res.send(err);
							error = 1;
						} else {

							var taskObject = {
								name : model[0].name,
								generic_id : model[0].generic_id,
								project_id : request[0].project_id
							}

							Task.create(taskObject, function (err) {
								if (err) {
									res.send(err);
									error = 1;
								}
							});

						}

					});

				}
			});
			if (!error) res.send("Project Created");
		};
	};

	dao.getProject = function (Project, Tasks) {
		return function(req, res) {

			var taskModel = [],
					projectModel = [];

			Project.findById(req.params.element_id , function(err, project) {
				if (err) {
					res.send(err);
				} else {
					projectModel = project;

					Tasks.find( { project_id : projectModel[0].project_id } , function(err, task) {
						if (err) {
							res.send(err);
						} else {
							taskModel = task;
							var response = projectModel.concat(taskModel);
							res.send(response);
						}
					});

				}
				
			});
		};
	};



	return dao;
}
