var express = require('express'),
  cons = require('consolidate'),
  nunjucks = require('nunjucks'),
  moment = require('moment'),
  path = require('path');

var app = module.exports = express();


/**
 * Configuration
 */

var env = new nunjucks.Environment(new nunjucks.FileSystemLoader('views'));
env.addFilter('date', function(date, format) {
  return moment(date).format(format);
});
env.express(app);

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
  res.render('index', require('./resume.json'));
});
