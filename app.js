// Module Dependencies
var express = require('express');
var load = require('express-load');
var resource = require('express-resource');

var mongoose = require('mongoose');

var http = require('http');
var path = require('path');

var config = require('./config');

// Create Express Instance
var app = express();

// Configure Express Instance
app.configure(function(){
    app.set('port', config.get('port') || 3000);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.set('view options', { pretty: false });
    app.use(express.favicon());
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieParser('your secret here'));
    app.use(express.session());
    app.use(require('./lib/flash'));
    app.use(app.router);
    app.use(require('stylus').middleware(__dirname + '/public'));
    app.use(express.static(path.join(__dirname, 'public')));
    mongoose.connect(config.get('database'));
});

app.configure('development', function(){
    app.use(express.logger('dev'));
    app.use(express.errorHandler());
});


// Load the necessary models, controllers, and routes
load('models')
    .then('controllers')
    .then('routes.js')
    .into(app);

// Start the server
http.createServer(app).listen(app.get('port'), function(){
    console.log("%s: ready on port %d in %s mode", (new Date()).toLocaleTimeString(), app.get('port'), app.get('env'));
});
