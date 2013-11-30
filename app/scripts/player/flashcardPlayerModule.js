'use strict';

angular.module('flashcardPlayerModule.controllers', ['ngSanitize']);

angular
    .module(
        'flashcardPlayerModule',
        ['ngRoute', 'flashcardPlayerModule.controllers']
    )
    .config(function($routeProvider) {
        $routeProvider
            .when('/Player/:flashcardListId/:flashcardId?', {
                templateUrl: 'views/player.html'
            });
    });