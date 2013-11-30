// Karma configuration
// http://karma-runner.github.io/0.10/config/configuration-file.html

module.exports = function(config) {
  config.set({
    // base path, that will be used to resolve files and exclude
    basePath: '../../',

    // testing framework to use (jasmine/mocha/qunit/...)
    frameworks: ['jasmine'],

    // coverage reporter generates the coverage
    reporters: ['progress', 'coverage'],
    
    preprocessors: {
      // source files, that you wanna generate coverage for
      // do not include tests or libraries
      // (these files will be instrumented by Istanbul)
      'app/scripts/**/*.js': ['coverage']
    },

    // optionally, configure the reporter
    coverageReporter: {
      type : 'html',
      dir : 'coverage/'
    },

    // list of files / patterns to load in the browser
    files: [
      'app/bower_components/angular/angular.js',
      'app/bower_components/angular-mocks/angular-mocks.js',
      'app/bower_components/angular-resource/angular-resource.js',
      'app/bower_components/angular-route/angular-route.js',
      'app/bower_components/angular-ui-bootstrap-bower/ui-bootstrap-tpls.js',
      'app/bower_components/angular-sanitize/angular-sanitize.js',
      'app/bower_components/showdown/compressed/showdown.js',

      // common
      'app/scripts/common/*.js',
      'app/scripts/common/services/*.js',
      'app/scripts/common/controllers/*.js',
      
      // lists
      'app/scripts/lists/*.js',
      'app/scripts/lists/services/*.js',
      'app/scripts/lists/controllers/*.js',
      
      // flashcards
      'app/scripts/flashcards/*.js',
      'app/scripts/flashcards/services/*.js',
      'app/scripts/flashcards/controllers/*.js',
      'app/scripts/flashcards/directives/*.js',

      // player
      'app/scripts/player/*.js',
      'app/scripts/player/controllers/*.js',

      // tests
      'test/spec/**/*.js'
    ],

    // list of files / patterns to exclude
    exclude: [],

    // web server port
    port: 8765,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: ['PhantomJS'],

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false
  });
};
