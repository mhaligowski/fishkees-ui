angular.module('flashcardListModule.controllers')
    .controller('ListModalCtrl', function($scope, $modalInstance, list) {
        $scope.list = list;

        $scope.cancel = function() { $modalInstance.dismiss('cancel'); }
        $scope.ok = function() { $modalInstance.close($scope.list); }
    })
