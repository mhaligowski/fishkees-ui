'use strict';

angular.module('fishkeesUiApp.flascardList', ['ngResource', 'ui.bootstrap'])
    .controller('FlashcardlistCtrl', function($scope, FlashcardLists) {
        // $scope.lists = FlashcardLists.query();
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
            }
        ];

    })

    .controller('ModalInstanceCtrl', function($scope, $modalInstance) {
        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        }
    })

    .controller('ModalCtrl', function($scope, $modal) {
        $scope.showModal = function() {
            var modalInstance = $modal.open({
                templateUrl: 'addNewListModal.html',
                controller: 'ModalInstanceCtrl',
                windowClass: 'add-new-list-modal'
            }); 
        };
    })

    .factory('FlashcardLists', function($resource) {
        return $resource('flashcardlists/:flashcardlistId.json', {}, {
            query: {method: 'GET', params: {flashcardlistId: 'flashcardlists'}, isArray: true}
        });
    })

    .config(function ($routeProvider) {
        $routeProvider
        .when('/FlashcardLists', {
            templateUrl: 'views/FlashcardList.html',
            controller: 'FlashcardlistCtrl'
        })
    });
