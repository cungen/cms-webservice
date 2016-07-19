"use strict";

const
    router = require('koa-router')(),
    passport = require('koa-passport');

router.post('/', function *(ctx, next) {
    var ctx = this;
    yield passport.authenticate('local', function*(err, user, info) {
        if (err) ctx.throw(err);
        if(info){
            ctx.status = 403;
            return ctx.body = info;
        }
        ctx.body = user;
    }).call(this, next)
});

module.exports = router;
