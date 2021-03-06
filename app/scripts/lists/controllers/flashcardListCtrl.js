'use strict'

angular.module('flashcardListModule.controllers')
    .controller('FlashcardListCtrl', function($scope, $modal, listsEditService) {
        $scope.lists = listsEditService.getLists();

        $scope.showAddNewListModal = function() {
            var modalInstance = $modal.open({
                templateUrl: 'views/addNewListModal.html',
                controller: 'SimpleModalCtrl',
                windowClass: 'add-new-list-modal',
                resolve: {
                    modalObject: function() { return {'title': ''}; }
                }
            }); 

            modalInstance.result.then(function(list) {
                listsEditService.addToLists($scope.lists, list);
            });
        };
        
        $scope.showRemoveListModal = function(list) {
            var modalInstance = $modal.open({
                templateUrl: 'views/removeListModal.html',
                controller: 'SimpleModalCtrl',
                resolve: {
                    modalObject: function() { return list; }
                },
                windowClass: 'remove-list-modal'
            });


            modalInstance.result.then(function(list) {
                listsEditService.removeFromLists($scope.lists, list);
            });
        }

        $scope.showEditListModal = function(list) {
            var modalInstance = $modal.open({
                templateUrl: 'views/editListModal.html',
                controller: 'SimpleModalCtrl',
                resolve: {
                    modalObject: function() { return {
                        'id': list.id,
                        'title': list.title,
                        'create_date': list.create_date
                    }},
                },
                windowClass: 'edit-list-modal'
            });

            modalInstance.result.then(function(list) {
                listsEditService.updateLists($scope.lists, list);
            });
        }
    })
