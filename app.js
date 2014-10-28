var express = require('express'),
  cons = require('consolidate'),
  nunjucks = require('nunjucks'),
  moment = require('moment'),
  path = require('path');

var app = module.exports = express();


/**
 * Configuration
 */

var env = new nunjucks.Environment(new nunjucks.FileSystemLoader([path.join(__dirname,'views'), path.join(__dirname, 'node_modules', 'gn_components', 'views')]));

env.addFilter('date', function(date, format) {
  return moment(date).format(format);
});


env.express(app);

// all environments

app.use(express.static(path.join(__dirname, 'public')));
app.engine('html', cons.nunjucks);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
// development only

/**
 * Routes
 */

var resumeJSON = require('./json/resume.json');

resumeJSON['levels'] = require('./json/skills.json');
resumeJSON['links'] = require('./json/links.json');

app.get('/', function(req,res) {
  res.render('index', resumeJSON);
});
