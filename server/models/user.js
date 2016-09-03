(function () {
  'use strict';

  let mongoose = require('mongoose'),
      Schema = mongoose.Schema;

  module.exports = mongoose.model('User', new Schema({
    username: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    person: {
      type: Schema.Types.ObjectId,
      ref: 'Person'
    }
  }));
} ());