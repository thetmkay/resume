var express = require('express'),
  cons = require('consolidate'),
  path = require('path');

var app = module.exports = express();


/**
 * Configuration
 */

// all environments
app.set('port', process.env.PORT || 3000);
app.use(express.static(path.join(__dirname, 'public')));
app.engine('html', cons.nunjucks);
app.set('view engine', 'html');
// development only



/**
 * Routes
 */

app.get('/', function(req,res) {
  res.render('index', require('./cv.json'));
});
