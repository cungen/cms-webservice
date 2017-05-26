"use strict";

const
    _ = require('lodash'),
    xss = require('xss'),
    router = require('koa-router')(),
    auth = require('../auth/auth.service'),
    params = require('../lib/params'),
    Term = require('../model/term.model');

_.map([
    { path: '/categories', type: 'category' },
    { path: '/tags', type: 'tag' },
    { path: '/menus', type: 'menu' }
], item => {
    router.get(item.path, getByType(item.type));

    router.post(item.path, auth.isAuthenticated, params({
        body: 'name'
    }), addByType(item.type));
});

function getByType (type) {
    return async function (ctx) {
        const terms = await Term.find({ taxonomy: type });
        ctx.body = { value: terms };
    };
}

function addByType (type) {
    return async function (ctx) {
        const params = ctx.request.body;
        try {
            await Term.create({
                name: params.name,
                slug: params.slug || params.name,
                description: params.description,
                taxonomy: type
            });
            ctx.body = { value: 'success' };
        } catch (err) {
            ctx.throw(400, err.message);
        }
    }
}

module.exports = router;