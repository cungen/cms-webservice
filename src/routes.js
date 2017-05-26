const
    Router = require('koa-router')(),
    users = require('./api/users'),
    post = require('./api/post'),
    term = require('./api/term');

module.exports = function(app) {

    Router.use('/users', users.routes());

    app.use(post.routes());
    app.use(term.routes());
    app.use(Router.routes());
};