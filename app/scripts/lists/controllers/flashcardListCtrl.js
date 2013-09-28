angular.module('flashcardListModule.controllers', ['ui.bootstrap', 'flashcardListModule.modals', 'flashcardListModule.flashcardListResource'])
    .controller('FlashcardListCtrl', function($scope, $modal, FlashcardLists) {
        $scope.lists = FlashcardLists.query();
        // $scope.lists = [
        //     {
        //         'id': 1,
        //         'title': 'Spanish for beginners',
        //         'create_date': 1379617022000
        //     },
        //     {
        //         'id': 2,
        //         'title': 'Russian for intermediate',
        //         'create_date': 1339347167000
        //     }
        // ];

        $scope.createList = function(newListData) {
            var newList = {
                'title': newListData.title,
                'create_date': new Date().getTime()
            };

            FlashcardLists.save(newList)
            $scope.lists.push(newList);
        }

        $scope.removeList = function(list) {
            var lists = $scope.lists;

            for (var l in lists) {
                if (lists[l].id == list.id) {
                    lists.splice(l, 1);
                    return;
                }     
            }
        }

        $scope.editList = function(list) {
            var lists = $scope.lists;
            for (var l in lists) {
                if (lists[l].id == list.id) {
                    lists[l].title = list.title;
                    return;
                }
            }
        }

        $scope.showAddNewListModal = function() {
            var modalInstance = $modal.open({
                templateUrl: 'views/addNewListModal.html',
                controller: 'ListModalCtrl',
                windowClass: 'add-new-list-modal',
                resolve: {
                    list: function() { return {'title': ''}; }
                }
            }); 

            modalInstance.result.then($scope.createList);
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

            modalInstance.result.then($scope.removeList);
        }

        $scope.showEditListModal = function(list) {
            var modalInstance = $modal.open({
                templateUrl: 'views/editListModal.html',
                controller: 'ListModalCtrl',
                resolve: {
                    list: function() { return {
                            'id': list.id,
                            'title': list.title
                        }
                    },
                },
                windowClass: 'edit-list-modal'
            });

            modalInstance.result.then($scope.editList);
        }
    })
