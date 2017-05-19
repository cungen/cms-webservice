"use strict";

const
    config = require('../config/env'),
    User = require('../model/user.model');

module.exports = function(passport) {

    (async function () {
        const userCount = await User.count();
        if (userCount === 0) {
            await User.create({
                username: 'cungen',
                password: 'test'
            });
        }
    })();

    passport.serializeUser(function(user, done) {
        done(null, user._id);
    });

    passport.deserializeUser(async function(id, done) {
        try {
            const user = await User.findById(id, done);
            done(null, user);
        } catch (err) {
            done(err);
        }
    });

    require('./local')(passport, User, config);
};