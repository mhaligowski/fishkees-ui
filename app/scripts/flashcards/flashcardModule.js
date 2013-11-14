'use strict';

angular.module('flashcardModule.directives', []);
angular.module('flashcardModule.services', ['flashcardListModule.services', 'ngResource']);
angular.module('flashcardModule.controllers', ['flashcardModule.services']);

angular.module('flashcardModule', ['flashcardModule.controllers', 'flashcardModule.directives', 'ngRoute'])
    .config(function($routeProvider) {
        $routeProvider.when('/FlashcardList/:id', {
            templateUrl: 'views/flashcardListDetails.html'
          });
      });