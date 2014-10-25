/**
 * Module dependencies
 */

var app = require('./app'),
    http = require('http');

app.set('port', process.env.PORT || 3000);


/**
 * Start Server
 */

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
