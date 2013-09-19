'use strict';

angular.module('fishkeesUiApp.flascardList')
  .controller('FlashcardlistCtrl', function ($scope) {
    $scope.lists = [
        {
            'id': 1,
            'title': 'Spanish for beginners',
            'create_date': new Date(1379617022 * 1000)
        },
        {
            'id': 2,
            'title': 'Russian for intermediate',
            'create_date': new Date(1329617167 * 1000)
        },

    ];
  })
  .config(function ($routeProvider) {
    $routeProvider
      .when('/FlashcardLists', {
        templateUrl: 'views/FlashcardList.html',
        controller: 'FlashcardlistCtrl'
      })
  });
;
