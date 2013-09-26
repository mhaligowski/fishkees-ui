angular.module('flashcardListsModule', ['ngResource', 
    'ui.bootstrap', 
    'flashcardListModule.controllers'])    
    .config(function ($routeProvider) {
        $routeProvider
        .when('/FlashcardLists', {
            templateUrl: 'views/FlashcardList.html'
        })
    });
