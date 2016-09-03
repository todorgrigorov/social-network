(function () {
    'use strict';

    let mongoose = require('mongoose'),
        Schema = mongoose.Schema;

    module.exports = mongoose.model('Comment', new Schema({
        date: {
            type: Date,
            default: Date.now()
        },
        message: {
            type: String,
            required: true
        },
        post: {
            type: Schema.Types.ObjectId,
            ref: 'Post'
        },
        likes: Number
    }));
} ());