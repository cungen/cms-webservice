"use strict";

const
    mongoose = require('mongoose'),
    router = require('koa-router')(),
    passport = require('koa-passport'),
    User = mongoose.model('User');

router.post('/', function *(next) {
    var ctx = this;
    passport.authenticate('local', function *(err, user, info) {
        if (err) ctx.throw(err);
        if (info) {
            ctx.status = 403;
            return ctx.body = info;
        }
        ctx.body = 'aaa';
    }).call(this, next);
});

module.exports = router;