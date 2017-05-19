const
    router = require('koa-router')(),
    auth = require('../../auth/auth.service');

router.get('/me', auth.isAuthenticated, me);

async function me(ctx, next) {
    ctx.body = {
        success: true,
        data: ctx.state.user
    };
    ctx.status = 200;
}

module.exports = router;
