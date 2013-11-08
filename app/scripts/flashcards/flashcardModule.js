'use strict';

angular.module('flashcardModule.services', ['flashcardListModule.services']);
angular.module('flashcardModule.controllers', ['flashcardModule.services']);

angular.module('flashcardModule', ['flashcardModule.controllers', 'ngRoute'])
    .config(function($routeProvider) {
        $routeProvider.when('/FlashcardList/:id', {
            templateUrl: 'views/flashcardListDetails.html'
          });
      });