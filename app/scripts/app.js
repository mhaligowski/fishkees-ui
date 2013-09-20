'use strict';
angular.module('fishkeesUiApp.flascardList', [])

angular.module('fishkeesUiApp', ['fishkeesUiApp.flascardList'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
