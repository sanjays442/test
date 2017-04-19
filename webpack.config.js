var CleanWebpackPlugin = require('clean-webpack-plugin'),
  CopyWebpackPlugin = require('copy-webpack-plugin'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin'),
  merge = require('webpack-merge'),
  path = require('path'),
  webpack = require('webpack'),
  PATHS = {
    app: path.join(__dirname, 'app/index.js'),
    build: path.join(__dirname, 'build')
  };

var common = {
  module: {
    rules: [{
      test: /\.css$/,
      use: [
        'style-loader',
        'css-loader'
      ]
    }, {
      test: /\.(jpg|png)$/,
      use: [{
        loader: 'file-loader'
      }]
    }, {
      test: /\.(ttf|eot|wvg|woff(2)?)(\?[a-z0-9]+)?$/,
      use: [{
        loader: 'file-loader'
      }]
    }, {
      test: /\.html$/,
      use: {
        loader: 'raw-loader'
      }
    }]
  },
  entry: PATHS.app,
  output: {},
  plugins: [],
  externals: {
    'angular': 'angular',
    'angular-ui-router': 'angular-ui-router'
  },
  resolve: {
    extensions: ['.js']
  },
  target: 'web' // default
};

// copy angular and angular-route to build directory
var copyWebpackPlugin = new CopyWebpackPlugin([{
  from: 'node_modules/angular/angular.js',
  to: PATHS.build
}, {
  from: 'node_modules/angular-animate/angular-animate.min.js',
  to: PATHS.build
}, {
  from: 'node_modules/angular-ui-router/release/angular-ui-router.min.js',
  to: PATHS.build
}, {
  from: 'node_modules/angular-ui-bootstrap/dist',
  to: PATHS.build
}, {
  from: 'node_modules/angularjs-dropdown-multiselect/dist',
  to: PATHS.build
}, {
  from: 'node_modules/angular-local-storage/dist',
  to: PATHS.build
}, {
  from: 'app/plugins',
  to: 'plugins'
}, {
  from: 'app/themes',
  to: 'themes'
}, {
  from: 'app/uploads',
  to: 'uploads'
}, {
  from: 'app/js',
  to: 'js'
}], {
  debug: 'warning'
});

var copyWebpackPluginForTest = new CopyWebpackPlugin([{
  from: 'node_modules/angular-mocks/angular-mocks.js',
  to: PATHS.build
}]);

// clean previously built files
var cleanWebpackPlugin = new CleanWebpackPlugin([PATHS.build], {
  root: __dirname
});

var htmlWebpackPlugin = new HtmlWebpackPlugin({
  title: 'Addiction Network',
  template: 'app/index.html'
});

var cssAssetsPlugin = new HtmlWebpackIncludeAssetsPlugin({
  assets: [
    'themes/addiction/css/bootstrap.css',
    'themes/addiction/css/bootstrap-select.css',
    'themes/addiction/css/custom.css',
    'themes/addiction/css/fwslider.css',
    'themes/addiction/css/bootstrap-multiselect.css',
    'themes/addiction/css/map-style.css',
    'ui-bootstrap-csp.css',
    'themes/addiction/css/font-awesome.min.css'
  ],
  append: false
});

var jsAssetsPlugin = new HtmlWebpackIncludeAssetsPlugin({
  assets: [
    'themes/addiction/js/css3-mediaqueries.js',
    'themes/addiction/css/jQuery-Multiselect/js/bootstrap-multiselect.js',
    'themes/addiction/js/common.js',
    // 'themes/addiction/js/multiple.js',
    'themes/addiction/js/maskinput.js',
    // 'themes/addiction/js/functions.js',
    'js/masonry.min.js',
    'js/jquery/jquery.masonry.min.js',
    'js/wp-embed.min.js',
    'angular.js',
    'angular-animate.min.js',
    'angular-ui-router.min.js',
    'ui-bootstrap-tpls.js',
    'angularjs-dropdown-multiselect.min.js',
    'angular-local-storage.min.js'
  ],
  append: false
});

// minify the source code for production
var uglifyJsPlugin = new webpack.optimize.UglifyJsPlugin({
  compress: {
    warnings: false
  }
});

// for development
var devConfig = merge(common, {
  output: {
    path: PATHS.build,
    filename: 'bundle.js'
  },
  plugins: [
    cleanWebpackPlugin,
    copyWebpackPlugin,
    cssAssetsPlugin,
    jsAssetsPlugin,
    htmlWebpackPlugin
  ],
  watch: true,
  devtool: 'source-map',
  devServer: {
    contentBase: PATHS.build,
    stats: 'errors-only',
    port: 3000,
    overlay: {
      errors: true,
      warnings: true
    }
  }
});

// for production
var prodConfig = merge(common, {
  output: {
    path: PATHS.build,
    filename: 'bundle.[hash].js'
  },
  plugins: [
    cleanWebpackPlugin,
    copyWebpackPlugin,
    cssAssetsPlugin,
    jsAssetsPlugin,
    htmlWebpackPlugin,
    uglifyJsPlugin
  ]
});

// for production
var testConfig = merge(common, {
  stats: 'errors-only',
  watch: false,
  output: {
    path: PATHS.build,
    filename: 'bundle.js'
  },
  plugins: [
    cleanWebpackPlugin,
    copyWebpackPlugin,
    copyWebpackPluginForTest,
    cssAssetsPlugin,
    jsAssetsPlugin,
    htmlWebpackPlugin
    // uglifyJsPlugin
  ]
});

var configMap = {
  'start': devConfig,
  'pretest': testConfig,
  'pretest-single-run': testConfig,
  'build': prodConfig
};
var event = process.env.npm_lifecycle_event;
var config = configMap[event];
module.exports = config;
