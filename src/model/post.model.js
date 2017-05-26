"use strict";

const
    mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const PostSchema = new Schema({
    author: Object,
    title: String,
    excerpt: String,
    created: {
        default: new Date(new Date().getTime() + 28800000),
        type: Date
    },
    updated: {
        default: new Date(new Date().getTime() + 28800000),
        type: Date
    },
    content: String
});


module.exports = mongoose.model('Post', PostSchema);