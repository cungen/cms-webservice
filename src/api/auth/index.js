"use strict";

const
    router = require('koa-router')(),
    passport = require('koa-passport');

router.post('/local', login);
router.get('/local', function *() {
    if (this.passport.user) {
        this.body = { user: this.passport.user };
    }
    this.status = 200;
});

router.get('/logout', logout);

function *login(next) {
    var _this = this;
    yield* passport.authenticate("local", function*(err, user, info) {
        if (err) {
            throw err;
        }
        if (user === false) {
            _this.status = 401;
        } else {
            yield _this.login(user);
            _this.body = { user: user };
        }
    }).call(this);
}

function logout(ctx) {
    ctx.logout();
}

module.exports = router;
