(function () {
    'use strict';

    let mongoose = require('mongoose'),
        Schema = mongoose.Schema;

    module.exports = mongoose.model('Person', new Schema({
        name: String,
        email: String,
        gender: Number,
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        posts: [{
            type: Schema.Types.ObjectId,
            ref: 'Post'
        }]
    }));
} ());