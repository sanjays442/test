var CleanWebpackPlugin = require('clean-webpack-plugin'),
  CopyWebpackPlugin = require('copy-webpack-plugin'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
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
        loader: 'file?name=[path][name].[hash].[ext]'
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
    'angular-route': 'angular-route'
  },
  resolve: {
    extensions: ['.js']
  },
  target: 'web' // default
};

// copy angular and angular-route to build directory
var copyWebpackPlugin = new CopyWebpackPlugin([{
  from: 'node_modules/angular/angular.min.js',
  to: PATHS.build
}, {
  from: 'node_modules/angular-route/angular-route.min.js',
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
}], {
  debug: 'warning'
});

// clean previously built files
var cleanWebpackPlugin = new CleanWebpackPlugin([PATHS.build], {
  root: __dirname,
  verbose: true,
  dry: false,
  exclude: ['.gitkeep']
});

var htmlWebpackPlugin = new HtmlWebpackPlugin({
  title: 'Addiction Network',
  template: 'app/index.html'
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
    htmlWebpackPlugin
  ],
  watch: true,
  devtool: 'source-map',
  devServer: {
    contentBase: PATHS.build,
    compress: true,
    port: 3000
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
    htmlWebpackPlugin,
    uglifyJsPlugin
  ]
});

var event = process.env.npm_lifecycle_event;
var config = (event === 'build' ? prodConfig : devConfig);
module.exports = config;
