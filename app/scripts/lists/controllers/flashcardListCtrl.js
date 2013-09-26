angular.module('flashcardListModule.controllers', ['ui.bootstrap', 'flashcardListModule.modals', 'flashcardListModule.flashcardListResource'])
    .controller('FlashcardlistCtrl', function($scope, $modal, FlashcardLists) {
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

        $scope.createNewList = function(newListData) {
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

        $scope.showAddNewListModal = function() {
            var modalInstance = $modal.open({
                templateUrl: 'views/addNewListModal.html',
                controller: 'AddNewListModalCtrl',
                windowClass: 'add-new-list-modal'
            }); 

            modalInstance.result.then($scope.createNewList);
        };
        
        $scope.showRemoveListModal = function(list) {
            var modalInstance = $modal.open({
                templateUrl: 'views/removeListModal.html',
                controller: 'RemoveListModalCtrl',
                resolve: {
                    list: function() { return list; }
                },
                windowClass: 'remove-list-modal'
            });

            modalInstance.result.then($scope.removeList);
        }
    })
