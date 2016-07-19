const
    Router = require('koa-router')(),
    auth = require('./api/auth'),
    users = require('./api/users');

module.exports = function(app) {

    Router.use('/auth', auth.routes());
    Router.use('/users', users.routes());

    app.use(Router.routes());
};