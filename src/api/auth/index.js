"use strict";

const
    router = require('koa-router')(),
    passport = require('koa-passport');

router.post('/local', local);
router.get('/logout', logout);

function *local(next) {
    yield passport.authenticate('local').call(this, next)
}

function logout(ctx) {
    ctx.logout();
}

module.exports = router;
