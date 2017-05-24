"use strict";

const
    router = require('koa-router')(),
    passport = require('koa-passport');

router.post('/local', login);
router.get('/local', async ctx => {
    if (ctx.state.user) {
        ctx.body = { value: { user: ctx.state.user } };
        ctx.status = 200;
    } else {
        ctx.body = { value: null, error_no: 401, error_msg: 'unAuthorized' };
        ctx.status = 401;
    }
});

router.get('/logout', logout);

async function login(ctx, next) {
    return passport.authenticate('local', async function (err, user, info, status) {
        if (user === false) {
            ctx.body = { value: null, error_no: 401, error_msg: info };
            ctx.status = 401;
        } else {
            ctx.body = { value: { user: ctx.state.user } };
            return ctx.login(user);
        }
    })(ctx, next);
}

function logout(ctx) {
    ctx.logout();
}

module.exports = router;
