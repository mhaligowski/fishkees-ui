'use strict';
angular.module('commonModule');
angular.module('flashcardListModule');
angular.module('flashcardModule');

angular.module('fishkeesUiApp', ['flashcardListModule', 'flashcardModule', 'ngRoute'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
      })
      .otherwise({
        redirectTo: '/'
      });
  });
