"use strict";

const 
    LocalStrategy = require('passport-local').Strategy,
    co = require('co');

module.exports = function(passport, User) {
    passport.use(new LocalStrategy(function(username, password, done) {
        console.log('in strategy');
        co(function *() {
            const user = yield User.findOne({ username: username });
            if (!user) {
                return done(null, false, { error_msg: 'not user exist' });
            }
            if (!user.authenticate(password)) {
                return done(null, false, { error_msg: 'password error' });
            }
            return done(null, user);
        }).catch(function(err) {
            return done(err);
        });
    }))
};
