angular.module('flashcardListModule.modals', ['ui.bootstrap'])
    .controller('AddNewListModalCtrl', function($scope, $modalInstance) {        
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

    .controller('RemoveListModalCtrl', function($scope, $modalInstance, list) {
        $scope.list = list;

        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        }

        $scope.ok = function() {
            $modalInstance.close($scope.list);
        }
    })
