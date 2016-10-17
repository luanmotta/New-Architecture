module.exports = function() {

	var dao = {};

	dao.getElement = function (Element, condition = {}) {
		return function (req, res) {
			Element.find(condition, function(err, model) {
				if (err) res.status(500).send(err);
				res.status(200).json(model);
			});
		};
	}; 

	dao.getElementById = function (Element) {
		return function (req, res) {
			Element.findById(req.params._id, function(err, model) {
				if (err) res.status(500).send(err);
				res.status(200).json(model);
			});
		};
	};

	dao.postElement = function (Element) {
		return function (req, res) {
			Element.create(req.body, function (err, model) {
				if (err) res.status(500).send(err);
				res.status(201).json(model);
			});
		};
	};

	dao.putElement = function(Element) {
		return function (req, res) {
			Element.findByIdAndUpdate(req.params._id, req.body, function(err, model) {
				if (err) res.status(500).send(err);
				res.status(200).json(model);
			});	
		};
	};

	dao.deleteElement = function(Element) {
		return function (req, res) {
			Element.remove(req.params._id, function(err, model) {
				if (err) res.status(500).send(err);
				res.status(200).json(model);
			});	
		};
	};

	return dao;
};
