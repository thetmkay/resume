var express = require('express'),
  cons = require('consolidate'),
  nunjucks = require('nunjucks'),
  moment = require('moment'),
  footer = require('gn-components/footer'),
  path = require('path');

var app = module.exports = express();


/**
 * Configuration
 */

var view_paths = [
  path.join(__dirname,'views'),
  footer.views
];

var env = new nunjucks.Environment(new nunjucks.FileSystemLoader(view_paths));

env.addFilter('date', function(date, format) {
  return moment(date).format(format);
});

env.addFilter('shorten', function(word) {
  if(word)
    return '(' + word.substr(0,1).toUpperCase() + ')';
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
resumeJSON['acknowledgements'] = require('./json/footer.json').acknowledgements;

app.get('/', function(req,res) {
  res.render('index', resumeJSON);
});
