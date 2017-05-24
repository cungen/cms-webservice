var
    path = require('path'),
    _ = require('lodash'),
    fs = require('fs');

var root = path.normalize(__dirname + '/../../..');

var all = {
    env: process.env.NODE_ENV || 'development',
    root: root,
    port: process.env.PORT || 8086,

    mongo: {
        uri: 'mongodb://localhost:27086/cms',
        db_port: '27086',
        db_path: path.join(root, 'data'),
        log_path: path.join(root, 'data/mongodb.log'),
        options: {
            db: {
                safe: true
            }
        }
    },

    session: {
        secrets: 'cms-webservice-secret',
        cookie:  {
            secure: false,
            domain: 'localhost',
            maxAge: 10 * 1000
        }
    }
};

var config;

if (fs.existsSync('./' + all.env + '.js')) {
    config = _.merge(all, require('./' + all.env + '.js') || {});
}

// private config
var privateConfigPath = path.join(__dirname, 'private/index.js');
if (fs.existsSync(privateConfigPath)) {
    config = _.merge(config, require(privateConfigPath) || {});
}

module.exports = config || all;
