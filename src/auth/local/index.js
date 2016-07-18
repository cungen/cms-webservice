"use strict";

const LocalStrategy = require('passport-local').Strategy;

module.exports = function(passport, User, config) {
    passport.use(new LocalStrategy(function(username, password, done) {
        console.log('in strategy');
        User.findOne({
            username: username,
            password: password
        }, done);
    }))
};
