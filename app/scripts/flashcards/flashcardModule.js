'use strict';

angular.module('flashcardModule.controllers', []);

angular.module('flashcardModule', ['flashcardModule.controllers', 'ngRoute'])
    .config(function($routeProvider) {
        $routeProvider.when('/FlashcardList/:id', {
            templateUrl: 'views/FlashcardListDetails.html'
          });
      });