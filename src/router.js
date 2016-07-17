var router = require('koa-router')();

router.get('/', function *(next) {
    console.log(this.request);
    this.body = {
        name: 'cungen'
    }
});

module.exports = function(app) {
    router.use('/')
    app.use(router.routes());
};