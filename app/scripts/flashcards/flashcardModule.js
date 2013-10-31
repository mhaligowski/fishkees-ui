'use strict';

angular.module('flashcardModule', ['ngRoute'])
    .config(function($routeProvider) {
        $routeProvider.when('/FlashcardList/:id', {
            templateUrl: 'views/FlashcardListDetails.html'
          });
      });