"use strict";

const
    router = require('koa-router')(),
    passport = require('koa-passport'),
    config = require('../config'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    auth = require('./auth.service');

// Passport Configuration
require('./local/pass').setup(User, config);
