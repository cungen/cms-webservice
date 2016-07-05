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
        db_port: '27070',
        db_path: path.join(root, 'data'),
        log_path: path.join(root, 'data/mongodb.log')
    }
};

module.exports = config;