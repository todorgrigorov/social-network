(function () {
    var mongoose = require('mongoose'),
        Schema = mongoose.Schema;

    module.exports = mongoose.model('Post', new Schema({
        body: {
            type: Schema.Types.ObjectId,
            ref: 'Comment'
        },
        replies: [{
            type: Schema.Types.ObjectId,
            ref: 'Comment'
        }],
        person: {
            type: Schema.Types.ObjectId,
            ref: 'Person'
        }
    }));
} ());