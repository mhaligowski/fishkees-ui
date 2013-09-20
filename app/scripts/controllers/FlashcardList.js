'use strict';

angular.module('fishkeesUiApp.flascardList', ['ngResource'])
  .controller('FlashcardlistCtrl', function ($scope, FlashcardLists) {
    $scope.lists = FlashcardLists.query();
  })
  .factory('FlashcardLists', function($resource) {
    return $resource('flashcardlists/:flashcardlistId.json', {}, {
        query: {method: 'GET', params: {flashcardlistId: 'flashcardlists'}, isArray: true}
    });
  })
  .config(function ($routeProvider) {
    $routeProvider
      .when('/FlashcardLists', {
        templateUrl: 'views/FlashcardList.html',
        controller: 'FlashcardlistCtrl'
      })
  });
;
