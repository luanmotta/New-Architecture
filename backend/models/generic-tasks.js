var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    GenericTaskSchema   = new Schema({
        name: String,
        generic_id: String
    });

module.exports = mongoose.model('GenericTask', GenericTaskSchema);


