const
    _ = require('lodash'),
    router = require('koa-router')(),
    passport = require('koa-passport'),
    auth = require('../../auth/auth.service')
    params = require('../../lib/params');

router.get('/me', auth.isAuthenticated, me);
router.post('/login', params({ body: ['username', 'password'] }), login);
router.get('/logout', logout);

async function me(ctx, next) {
    ctx.body = {
        value: _.pick(ctx.state.user, ['username'])
    };
    ctx.status = 200;
}

async function login (ctx, next) {
    return passport.authenticate('local', async function (err, user, info, status) {
        if (user === false) {
            ctx.throw(401, info);
        } else {
            ctx.body = { value: 'success' };
            return ctx.login(user);
        }
    })(ctx, next);
}

async function logout (ctx) {
    ctx.logout();
}

module.exports = router;
