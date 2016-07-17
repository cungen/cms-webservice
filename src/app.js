"use strict";

const
    app = require('koa')(),
    config = require('./config/env'),
    router = require('./router'),
    session = require('koa-mongodb-session'),
    mongoose = require('mongoose');

mongoose.connect(config.mongo.uri, config.mongo.options);

require('./config/koa')(app);

app.listen(config.port, function() {
    console.log('Koa server listening on %d, in %s mode', config.port, config.env);
});
