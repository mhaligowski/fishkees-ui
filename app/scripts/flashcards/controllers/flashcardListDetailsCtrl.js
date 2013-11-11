angular.module('flashcardModule.controllers')
    .controller(
        'FlashcardListDetailsCtrl', 
        function($scope, 
                 $routeParams, 
                 $modal,
                 flashcardListDetailsService) {
            var listId = $routeParams.id;
            
            $scope.list = flashcardListDetailsService.getListDetails(listId);
            $scope.flashcards = flashcardListDetailsService.getFlashcards(listId);

            $scope.showRemoveFlashcardModal = function(flashcard) {
                $modal.open({
                    templateUrl: 'views/removeFlashcardModal.html',
                    windowClass: 'remove-flashcard-modal'
                });
                
            }
        });