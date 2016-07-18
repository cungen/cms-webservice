"use strict";

const
    passport = require('koa-passport'),
    config = require('../config/env'),
    User = require('../model/user.model');

module.exports = function() {

    // add test user
    User.findOne({ username: 'test' }, function (err, testUser) {
        if (!testUser) {
            console.log('test user did not exist; creating test user...');
            testUser = new User({
                username: 'test',
                password: 'test'
            });
            testUser.save()
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