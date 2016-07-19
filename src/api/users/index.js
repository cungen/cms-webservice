const
    router = require('koa-router')(),
    auth = require('../../auth/auth.service');

router.get('/me', auth.isAuthenticated, me);

function *me() {
    this.status = 200;
    this.body = {
        success: true,
        data: this.req.user
    }
}

module.exports = router;
