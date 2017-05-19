"use strict";

const 
    LocalStrategy = require('passport-local').Strategy;

module.exports = function (passport, User) {
    passport.use(new LocalStrategy(async function (username, password, done) {
        const user = await User.findOne({ username: username });
        if (!user) {
            return done(null, false, { error_msg: 'Invalid username or password.' });
        }
        if (!user.authenticate(password)) {
            return done(null, false, { error_msg: 'Invalid username or password.' });
        }
        return done(null, user);
    }))
};
