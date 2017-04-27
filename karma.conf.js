// Karma configuration
// Generated on Sat Apr 01 2017 21:53:33 GMT-0700 (PDT)

module.exports = function (config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '.',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: [
      'build/angular.js',
      'build/angular-animate.min.js',
      'build/angular-ui-router.min.js',
      'build/ui-bootstrap-tpls.js',
      'build/angular-mocks.js',
      'build/angularjs-dropdown-multiselect.min.js',
      'build/angular-local-storage.min.js',
      'build/bundle.js',
      'app/**/*.spec.js'
    ],

    // list of files to exclude
    exclude: [
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      // add webpack as preprocessor
      'app/**/*.spec.js': ['webpack', 'sourcemap']
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['mocha'],
    // reporter options
    // https://www.npmjs.com/package/karma-mocha-reporter
    mochaReporter: {
      symbols: {
        success: '+',
        info: '#',
        warning: '!',
        error: 'x'
      },
      output: 'full'
    },

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_ERROR,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: [
      'PhantomJS'
    ],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity,

    plugins: [
      require('karma-webpack'),
      require('karma-sourcemap-loader'),
      require('karma-jasmine'),
      require('karma-phantomjs-launcher'),
      require('karma-mocha-reporter')
    ],

    webpack: {
      // you don't need to specify the entry option because
      // karma watches the test entry points
      // webpack watches dependencies

      // errors-only, minimal, none, normal, verbose
      stats: 'errors-only',
      devtool: 'source-map'
    },

    webpackMiddleware: {
      // webpack-dev-middleware configuration
      // i.e.
      noInfo: false,
      // and use stats to turn off verbose output
      stats: {
        // options i.e.
        chunks: false
      }
    }
  });
};
