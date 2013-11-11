'use strict'

angular.module('commonModule.controllers')
    .controller('SimpleModalCtrl', function($scope, $modalInstance, modalObject) {
        $scope.modalObject = modalObject;

        $scope.cancel = function() { $modalInstance.dismiss('cancel'); }
        $scope.ok = function() { $modalInstance.close($scope.modalObject); }
    })
