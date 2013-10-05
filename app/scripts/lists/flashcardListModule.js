angular.module('flashcardListModule.services', ['commonModule.services']);
angular.module('flashcardListModule.controllers', ['ui.bootstrap', 'flashcardListModule.services']);

angular.module('flashcardListsModule', ['flashcardListModule.controllers'])    
    .config(function ($routeProvider) {
        $routeProvider
        .when('/FlashcardLists', {
            templateUrl: 'views/FlashcardList.html'
        })
    });
