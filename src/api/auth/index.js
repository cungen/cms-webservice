"use strict";

const
    router = require('koa-router')(),
    passport = require('koa-passport');

router.post('/local', local);
router.get('/logout', logout);

function *local(next) {
    var ctx = this;
    yield passport.authenticate('local', function *(err, user, info) {
        if (err) {
            ctx.throw(err);
        }
        if(info){
            ctx.status = 403;
            return ctx.body = info;
        }
        ctx.login(user);
        ctx.body = { success: true };
    }).call(this, next)
}

function logout(ctx) {
    ctx.logout();
}

module.exports = router;
