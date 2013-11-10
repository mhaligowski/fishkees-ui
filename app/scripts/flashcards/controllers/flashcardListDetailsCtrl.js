angular.module('flashcardModule.controllers')
    .controller(
        'FlashcardListDetailsCtrl', 
        function($scope, $routeParams, flashcardListDetailsService){
            var listId = $routeParams.id;
            
            $scope.list = flashcardListDetailsService.getListDetails(listId);
            $scope.flashcards = flashcardListDetailsService.getFlashcards(listId);
        });