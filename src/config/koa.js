const
    bodyParser = require('koa-bodyparser'),
    json = require('koa-json'),
    config = require('./env');

module.exports = function(app) {
    app.use(bodyParser());
    app.use(json());
    app.keys = [config.session.secrets];
};