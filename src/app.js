"use strict";

const
    Koa = require('koa'),
    app = new Koa(),
    passport = require('koa-passport'),
    bodyParser = require('koa-bodyparser'),
    logger = require('koa-logger'),
    json = require('koa-json'),
    convert = require('koa-convert'),
    session = require('koa-generic-session'),
    MongooseStore = require('koa-session-mongoose'),
    mongoose = require('mongoose'),
    config = require('./config/env');

mongoose.Promise = global.Promise;
mongoose.connect(config.mongo.uri, config.mongo.options);

// Error handler
app.use(require('./lib/errorHandler')());

app.use(logger());
app.use(bodyParser());
app.use(json());

app.keys = [config.session.secrets];
app.use(convert(session({
    key: 'sid',
    secret: config.session.secrets,
    store: new MongooseStore({
        collection: 'session',
        connection: mongoose,
        expires: config.session.expires
    }),
    cookie: config.session.cookie
})));

require('./auth')(passport);

app.use(passport.initialize());
app.use(passport.session());

require('./routes')(app);

app.listen(config.port, function() {
    console.log('Koa server listening on %d, in %s mode', config.port, config.env);
});
