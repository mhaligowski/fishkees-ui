angular.module('flashcardModule.controllers')
    .controller(
        'FlashcardListDetailsCtrl', 
        function($scope, 
                 $routeParams, 
                 $modal,
                 flashcardListDetailsService) {
            var service = flashcardListDetailsService;
            var listId = $routeParams.id;
            
            $scope.list = service.getListDetails(listId);
            $scope.flashcards = service.getFlashcards(listId);

            var removeFromFlashcards = function(flashcard) {
                service
                    .removeFlashcardFromList(flashcard, $scope.flashcards)
                    .then(function(newFlashcardsList) {
                        $scope.flashcards = newFlashcardsList;
                    });
                };

            $scope.showRemoveFlashcardModal = function(flashcard) {
                var modalInstance = $modal.open({
                    templateUrl: 'views/removeFlashcardModal.html',
                    windowClass: 'remove-flashcard-modal',
                    controller: 'SimpleModalCtrl',
                    resolve: {
                        modalObject: function() { return flashcard; }
                    }
                });

                modalInstance.result.then(removeFromFlashcards);
            }
        });