const
    Router = require('koa-router')(),
    auth = require('./auth');

module.exports = function(app) {

    Router.use('/auth', auth.routes());

    app.use(Router.routes());
};