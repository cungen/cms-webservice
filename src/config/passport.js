const
    LocalStrategy = require('passport-local').Strategy,
    User = require('../model/user.model');

module.exports = function(passport) {
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    passport.use(new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password'
    }, function(name, password, done) {
        co(function *() {
            const user = yield User.findOne({ username: name });
            if (!user) {
                return done(null, false, { error_msg: 'username or password error' });
            }
            if (!user.authenticate(password)) {
                return done(null, false, { error_msg: 'username or password error' });
            }
            return done(null, user);
        }).catch(function(err) {
            return done(err);
        })
    }));

};