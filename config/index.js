var nconf = require('nconf');
var path = require('path');

var config = module.exports = new nconf.Provider({});

config.env();

var environment = config.get('NODE_ENV') || 'development';
config
    .file('env_specific', {
            file: environment + '.json'
        ,   dir: __dirname
        ,   search: true
    })
    .file('default', {
            file: 'config.json'
        ,   dir: __dirname
        ,   search: true
    })
    ;
