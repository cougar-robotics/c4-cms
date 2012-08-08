var nconf = require('nconf');
var path = require('path');

nconf.env()
     .file(path.join(__dirname, 'config', 'config.json'))
     .file(path.join(__dirname, 'config', nconf.get('NODE_ENV') + '.json'))
     ;

module.exports = nconf;
