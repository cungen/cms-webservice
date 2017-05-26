"use strict";

const
    mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const TermSchema = new Schema({
    name: String,
    slug: String, // url path
    description: String,
    termGroup: {
        type: String,
        default: 0
    },
    order: {
        type: Number,
        default: 0
    },
    count: {
        type: Number,
        default: 0
    },
    parent: {
        type: String,
        default: ''
    },
    taxonomy: String
});

module.exports = mongoose.model('Term', TermSchema);