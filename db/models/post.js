var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var post = new Schema({
    userId: Schema.Types.ObjectId,
    title: {
        type: String
    },
    description: {
        type: String
    },

    category: {
        type: String
    },

    image: {
        type: String
    }

});
module.exports = mongoose.model('Post', post);
