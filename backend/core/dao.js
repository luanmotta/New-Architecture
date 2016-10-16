var mongoose     = require('mongoose');

module.exports = function() {

	var dao = {};

	dao.getElement = function (Element, condition) {
		return function (req, res) {
			var where = condition || {};
			Element.find(where, function(err, model) {
				if (err) res.status(500).send(err);
				res.status(200).json(model);
			});
		}
	}; 

	dao.getElementById = function (Element, id) {
		return function (req, res) {
			var where = id || 0;
			Element.findById(where, function(err, model) {
				if (err) res.status(500).send(err);
				res.status(200).json(model);
			});
		}
	};

	dao.postElement = function (Element) {
		return function (req, res) {
			Element.create(req.body, function (err, model) {
				if (err) res.status(500).send(err);
				res.status(201).json(model);
			});
		}
	};

	dao.putElement = function(Element) {
		return function (req, res) {
			Element.findByIdAndUpdate(req.params._id, req.body, function(err, model) {
				if (err) res.status(500).send(err);
				res.status(200).json(model);
			});	
		}
	};

	dao.deleteElement = function(Element) {
		return function (req, res) {
			Element.remove(req.params._id, function(err, model) {
				if (err) res.status(500).send(err);
				res.status(200).json(model);
			});	
		}
	};

	return dao;
}
