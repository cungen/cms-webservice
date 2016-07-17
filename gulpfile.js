var path = require('path');
var gulp = require('gulp');
var _debug = require('debug');
var nodemon = require('gulp-nodemon');
var spawn = require('child_process').spawn;
var del = require('del');
var pkg = require('./package.json');

var config = require('./src/config/env/index.js');

gulp.task('server', ['mongod'], function() {
    nodemon({
        script: path.join(config.root, 'src/app.js'),
        watch: [path.join(config.root, 'src')],
        execMap: {
            js: "node --harmony"
        },
        env: {
            NODE_ENV: 'development',
            DEBUG: pkg.name + ':*'
        }
    })
});

gulp.task('mongod', ['clear:log'], function() {
    var debug = _debug('gulp:mongod');
    debug('start mongod at port: ' + config.mongo.db_port + ' with dbpath: ' + config.mongo.db_path);
    var mongo = spawn('mongod', [
        '--dbpath', config.mongo.db_path, '--port', config.mongo.db_port, '--logpath', config.mongo.log_path
    ]);
    mongo.stdout.on('data', function(data) {
        console.log('' + data);
    });

    mongo.stderr.on('data', function(data) {
        console.log('' + data);
    });

    mongo.on('close', function() {
    });

});

gulp.task('clear:log', function() {
    return del([
        config.mongo.db_path + '/*.log*'
    ])
});
