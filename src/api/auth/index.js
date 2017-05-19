"use strict";

const
    router = require('koa-router')(),
    passport = require('koa-passport');

router.post('/local', login);
router.get('/local', async ctx => {
    if (ctx.state.user) {
        ctx.body = { user: ctx.state.user };
        ctx.status = 200;
    } else {
        ctx.body = { user: null };
        ctx.status = 401;
    }
});

router.get('/logout', logout);

async function login(ctx, next) {
    return passport.authenticate('local', async function (err, user, info, status) {
        if (user === false) {
            ctx.body = { user: null, info: info };
            ctx.status = 401;
        } else {
            ctx.body = { user: user };
            return ctx.login(user);
        }
    })(ctx, next);
}

function logout(ctx) {
    ctx.logout();
}

module.exports = router;
