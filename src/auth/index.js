"use strict";

const
    router = require('koa-router')(),
    passport = require('koa-passport'),
    mongoose = require('mongoose'),
    User = mongoose.model('User');

router.use('/local', require('./local').routes());

module.exports = router;