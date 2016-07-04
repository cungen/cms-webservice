const path = require('path');

const root = __dirname;
var config;

config = {
    path: {
        root: root,
        src: path.join(root, 'src')
    },
    server: {
        port: '8081'
    },
    mongo: {
        db_host: '127.0.0.1',
        db_port: '27017'
    }
};

module.exports = config;