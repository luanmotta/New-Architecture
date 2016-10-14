var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    TaskSchema   = new Schema({
        name: String,
        generic_id: String,
        project_id: String
    });

module.exports = mongoose.model('Task', TaskSchema);


