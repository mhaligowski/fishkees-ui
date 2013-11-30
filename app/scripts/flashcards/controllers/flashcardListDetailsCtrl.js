angular.module('flashcardModule.controllers')
    .controller(
        'FlashcardListDetailsCtrl', 
        function($scope, 
                 $routeParams, 
                 $modal,
                 flashcardListDetailsService) {
            var service = flashcardListDetailsService;
            var listId = $routeParams.id;
            
            $scope.flashcards = [];
            $scope.list = "";

            service
                .getListDetails(listId)
                .then(function(result) {
                    $scope.list = result;
                });

            service
                .getFlashcards(listId)
                .then(function(result) {
                    $scope.flashcards = result;
                });

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

            $scope.updateFlashcardFront = function(flashcard, newValue) {
                flashcard.front = newValue;
                service.updateFlashcard(flashcard);
            }

            $scope.updateFlashcardBack = function(flashcard, newValue) {
                flashcard.back = newValue;
                service.updateFlashcard(flashcard);
            }

            $scope.addNewFlashcardAtTop = function() {
                service
                    .createNewFlashcard(listId)
                    .then(function(newFlashcard) {
                        newFlashcard.isNew = true;
                        $scope
                            .flashcards
                            .unshift(newFlashcard);     
                    });     
            }
        }
    );