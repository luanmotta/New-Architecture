var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ProjectSchema   = new Schema({
        name:        String,
        generic_id: String,
        project_id: String
    });

module.exports = mongoose.model('Project', ProjectSchema);

