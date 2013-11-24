'use strict';

angular.module('commonModule');
angular.module('flashcardListModule');
angular.module('flashcardModule');
angular.module('flashcardPlayerModule');

angular
    .module('fishkeesUiApp', ['flashcardListModule',
        'flashcardModule',
        'flashcardPlayerModule',
        'ngRoute'])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
            })
            .otherwise({
                redirectTo: '/'
            });
    });
