const app = require('koa')();
const config = require('../config');


app.use(function *() {
    this.body = 'Hello World!'
});

app.listen(config.server.port);