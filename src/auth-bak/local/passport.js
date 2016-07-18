const LocalStrategy = require('passport-local').Strategy;

module.setup = function(passport, User, config) {

    User.findOne({ username: 'test' }, function(err, testUser) {
        if (!testUser) {
            console.log('test user did not exist; creating test user ...');
            testUser = new User({
                username: 'test',
                password: 'test'
            });
            testUser.save();
        }
    });

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