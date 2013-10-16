angular.module('flashcardListModule.services', ['commonModule.services', 'ngResource']);
angular.module('flashcardListModule.controllers', ['ui.bootstrap', 'flashcardListModule.services']);

angular.module('flashcardListsModule', ['flashcardListModule.controllers', 'ngRoute'])    
    .config(function ($routeProvider) {
        $routeProvider
        .when('/FlashcardLists', {
            templateUrl: 'views/FlashcardList.html'
        });
    });
