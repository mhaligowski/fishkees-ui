'use strict';

angular
    .module('flashcardPlayerModule', ['ngRoute'])
    .config(function($routeProvider) {
        $routeProvider
            .when('/Player/:flashcardListId/:flashcardId', {
                templateUrl: 'views/player.html'
            });
    });