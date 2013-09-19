'use strict';

angular.module('fishkeesUiApp.flascardList')
  .controller('FlashcardlistCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  })
  .config(function ($routeProvider) {
    $routeProvider
      .when('/FlashcardLists', {
        templateUrl: 'views/FlashcardList.html',
        controller: 'FlashcardlistCtrl'
      })
  });
;
