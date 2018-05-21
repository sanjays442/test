var express = require('express'),
  app = express();

var minify = require('express-minify');

app.set('port', (process.env.PORT || 3003));
app.use(compression());
// app.use(minify());
app.use(minify({
  cache: false,
  // errorHandler: null,
  jsMatch: /javascript/,
  cssMatch: /css/,
  jsonMatch: /json/,

  // sassMatch: /scss/,
  // lessMatch: /less/,
  // stylusMatch: /stylus/,
  // coffeeScriptMatch: /coffeescript/,
}));
app.use(express.static(__dirname + '/build'));
app.listen(app.get('port'), function () {
  console.log('Node app is running on port', app.get('port'));
});
