'use strict'

angular
    .module('flashcardPlayerModule.controllers')
    .controller(
        'PlayerCtrl', 
        function($scope,
                 $routeParams,
                 $location,
                 $sce,
                 flashcardListDetailsService) {
            var service = flashcardListDetailsService,
                flashcardListId = $routeParams.flashcardListId,
                flashcardId = $routeParams.flashcardId,
                converter = new Showdown.converter();

            var findFlashcardWithId = function(flashcards, searchedFlashcardId) {
                return flashcards.filter(function(f) { return f.id === searchedFlashcardId; })[0];
            }

            service
                .getFlashcards(flashcardListId)
                .then(function(result) {
                    $scope.flashcards = result;
                    
                    if (!flashcardId) {
                        $location
                            .path('/Player/' 
                                + flashcardListId + '/' 
                                + $scope.flashcards[0].id);
                        flashcardId = $scope.flashcards[0].id;
                    }

                    $scope.currentFlashcard = findFlashcardWithId($scope.flashcards, flashcardId);
                    $scope.renderedText = $sce.trustAsHtml(converter.makeHtml($scope.currentFlashcard.front));
                });

            $scope.isFront = true;

    });