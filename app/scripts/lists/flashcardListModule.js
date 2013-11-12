'use strict';

angular.module('flashcardListModule.services', ['commonModule', 'ngResource']);
angular.module('flashcardListModule.controllers', ['ui.bootstrap', 'flashcardListModule.services']);

angular.module('flashcardListModule', ['flashcardListModule.controllers', 'ngRoute'])
    .config(function ($routeProvider) {
        $routeProvider
        .when('/FlashcardList', {
            templateUrl: 'views/FlashcardList.html'
          });
      });
