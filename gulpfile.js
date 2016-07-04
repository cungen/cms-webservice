var path = require('path');
var gulp = require('gulp');
var nodemon = require('gulp-nodemon');

var config = require('./config');

gulp.task('server', function() {
    nodemon({
        script: path.join(config.path.src, 'app.js'),
        watch: [config.path.src],
        execMap: {
            js: "node --harmony"
        },
        env: {
            NODE_ENV: 'development',
            DEBUG: '*'
        }
    })
});