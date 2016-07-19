"use strict";

const
    app = require('koa')(),
    bodyParser = require('koa-bodyparser'),
    logger = require('koa-logger'),
    json = require('koa-json'),
    session = require('koa-generic-session'),
    MongooseStore = require('koa-mongodb-session'),
    mongoose = require('mongoose'),
    config = require('./config/env');

mongoose.connect(config.mongo.uri, config.mongo.options);

app.use(logger());
app.use(bodyParser());
app.use(json());

app.keys = [config.session.secrets];
app.use(session({
    key: 'sid',
    store: new MongooseStore({
        collection: 'session',
        connection: mongoose,
        expires: 60 * 60 * 24 * 14
    }),
    cookie: config.session.cookie
}));

require('./auth')();

const passport = require('koa-passport');

app.use(passport.initialize());
app.use(passport.session());

require('./routes')(app);

app.listen(config.port, function() {
    console.log('Koa server listening on %d, in %s mode', config.port, config.env);
});
