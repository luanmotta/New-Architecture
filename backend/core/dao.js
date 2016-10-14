var errorHandler = require('./error-handler.js');

module.exports = function(mongoose) {

	var dao = {};

	dao.getElement = function (Element, callback, condition) {
		var where = condition || {};
    Element.find(where, function(err, model) {
      if (err) errorHandler(err);
      else callback(model);
    });
	}; 

	dao.getElementById = function (Element, callback, id) {
		var where = id || 0;
    Element.findById(id, function(err, model) {
      if (err) errorHandler(err);			
    	else callback(model);
    });
	};

	dao.postElement = function (Element, callback, content) {
		var data = content || {},
        model = new Element();
    Element.create(data, function (err) {
      if (err) errorHandler(err);
      else callback(model);
    });
	};

	dao.putElement = function(Element, callback, content, id) {
		var where = id || 0,
		    data = content || {};
		Element.findByIdAndUpdate(where, data, function(err, model) {
			if (err) errorHandler(err);			
			else callback(model);
		});	
	};

	dao.deleteElement = function(Element, callback, id) {
		var where = id || 0;
    Element.remove(where, function(err, model) {
      if (err) errorHandler(err);			
      else callback(model);
    });	
	};

	return dao;
}
