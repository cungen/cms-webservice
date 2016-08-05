"use strict";

const
    co = require('co'),
    config = require('../config/env'),
    User = require('../model/user.model');

module.exports = function(passport) {

    // add test user
    co(function *() {
        const userCount = yield User.count();
        if (userCount === 0) {
            yield User.create({
                username: 'cungen',
                password: 'test'
            });
        }
    });

    passport.serializeUser(function(user, done) {
        done(null, user._id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, done);
    });

    require('./local')(passport, User, config);
};