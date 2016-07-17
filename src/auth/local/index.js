"use strict";

const
    mongoose = require('mongoose'),
    router = require('koa-router')(),
    passport = require('koa-passport'),
    User = mongoose.model('User');
