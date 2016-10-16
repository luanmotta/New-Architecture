var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ProjectSchema   = new Schema({
        name:        String
    });

module.exports = mongoose.model('Project', ProjectSchema);

