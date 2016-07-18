"use strict";

const
    router = require('koa-router')(),
    passport = require('koa-passport');

router.post('/', function *(next) {
    var ctx = this;
    console.log(this.req.body);
    passport.authenticate('local', function *(err, user, info) {
        console.log(arguments);
        if (err) ctx.throw(err);
        if (info) {
            ctx.status = 403;
            return ctx.body = info;
        }
        ctx.body = 'aaa';
    }).call(this, next);
});

module.exports = router;
