'use strict';

angular.module('fishkeesUiApp.flascardList', ['ngResource', 'ui.bootstrap'])
    .controller('FlashcardlistCtrl', function($scope, FlashcardLists, $modal) {
        // $scope.lists = FlashcardLists.query();
        $scope.lists = [
            {
                'id': 1,
                'title': 'Spanish for beginners',
                'create_date': 1379617022000
            },
            {
                'id': 2,
                'title': 'Russian for intermediate',
                'create_date': 1339347167000
            }
        ];

        $scope.createNewList = function(newListData) {
            var newList = {
                'title': newListData.title,
                'create_date': new Date().getTime()
            };

            FlashcardLists.save(newList)
            $scope.lists.push(newList);
        }

        $scope.showAddNewListModal = function() {
            var modalInstance = $modal.open({
                templateUrl: 'views/addNewListModal.html',
                controller: 'AddNewListModalInstanceCtrl',
                windowClass: 'add-new-list-modal'
            }); 

            modalInstance.result.then($scope.createNewList);
        };
        
        $scope.showRemoveListModal = function() {
            var modalInstance = $modal.open({
                templateUrl: 'views/removeListModal.html',
                // controller: 'AddNewListModalInstanceCtrl',
                windowClass: 'remove-list-modal'
            });
        }
    })

    .controller('AddNewListModalInstanceCtrl', function($scope, $modalInstance) {        
        $scope.newList = {
            title: ''
        }

        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        }

        $scope.ok = function() {
            $modalInstance.close($scope.newList);
        }
    })

    .factory('FlashcardLists', function($resource) {
        return $resource('flashcardlists/:flashcardlistId', {}, {
            query: {method: 'GET', isArray: true},
            save: {method: 'POST'} 
        });
    })

    .config(function ($routeProvider) {
        $routeProvider
        .when('/FlashcardLists', {
            templateUrl: 'views/FlashcardList.html'
        })
    });
