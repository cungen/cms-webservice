"use strict";

const
    router = require('koa-router')(),
    passport = require('koa-passport'),
    mongoose = require('mongoose'),
    config = require('../config/env'),
    User = mongoose.model('User');

require('./local/passport').setup(passport, User, config);

router.use('/local', require('./local').routes());

module.exports = router;