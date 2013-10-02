'use strict';
angular.module('commonModule');
angular.module('flashcardListsModule');

angular.module('fishkeesUiApp', ['flashcardListsModule'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
      })
      .otherwise({
        redirectTo: '/'
      });
  });
