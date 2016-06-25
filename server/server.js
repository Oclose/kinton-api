var loopback = require('loopback');
var boot = require('loopback-boot');
var explorer = require('loopback-component-explorer');

var app = module.exports = loopback();

// Alternatively, register as a middleware:
app.use('/explorer', explorer.routes(app, {
  basePath: '/api'
}));

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});
