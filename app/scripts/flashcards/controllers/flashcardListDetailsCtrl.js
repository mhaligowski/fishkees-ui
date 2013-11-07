angular.module('flashcardModule.controllers')
    .controller(
        'FlashcardListDetailsCtrl', 
        function($scope, $routeParams, flashcardlistDetailsService){
            var listId = $routeParams.id;
            $scope.list = flashcardlistDetailsService.getListDetails(listId);
        });