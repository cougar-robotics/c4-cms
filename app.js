var flatiron = require('flatiron');
var config = require('config');
var app = flatiron.app;

app.use(flatiron.plugins.http);

app.router.get('/', function () {
  this.res.json({ 'hello': 'world' })
});

app.start(3000);
