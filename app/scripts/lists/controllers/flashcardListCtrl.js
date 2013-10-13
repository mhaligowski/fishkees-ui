angular.module('flashcardListModule.controllers')
    .controller('FlashcardListCtrl', function($scope, $modal, listsEditService) {
        $scope.lists = listsEditService.getLists();

        $scope.showAddNewListModal = function() {
            var modalInstance = $modal.open({
                templateUrl: 'views/addNewListModal.html',
                controller: 'ListModalCtrl',
                windowClass: 'add-new-list-modal',
                resolve: {
                    list: function() { return {'title': ''}; }
                }
            }); 

            modalInstance.result.then(function(list) {
                listsEditService.addToLists($scope.lists, list);
            });
        };
        
        $scope.showRemoveListModal = function(list) {
            var modalInstance = $modal.open({
                templateUrl: 'views/removeListModal.html',
                controller: 'ListModalCtrl',
                resolve: {
                    list: function() { return list; }
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
                controller: 'ListModalCtrl',
                resolve: {
                    list: function() { return {
                        'id': list.id,
                        'title': list.title
                    }},
                },
                windowClass: 'edit-list-modal'
            });

            modalInstance.result.then(function(list) {
                listsEditService.updateLists($scope.lists, list);
            });
        }
    })
