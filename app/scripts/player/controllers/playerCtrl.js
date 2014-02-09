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
            $scope.flashcards = [];
            $scope.currentFlashcard = {};
            $scope.renderedText = "";
            $scope.isFront = true;

            var service = flashcardListDetailsService,
                flashcardListId = $routeParams.flashcardListId,
                converter = new Showdown.converter();

            var findFlashcardWithId = function(flashcards, searchedFlashcardId) {
                return flashcards.filter(function(f) { return f.id === searchedFlashcardId; })[0];
            };

            var updateRenderedText = function() {
                var newText = $scope.isFront === true 
                    ? $scope.currentFlashcard.front
                    : $scope.currentFlashcard.back;
                $scope.renderedText = $sce.trustAsHtml(converter.makeHtml(newText));                
            }

            var goToCurrentPathLocation = function() {
                var flashcardId = $scope.currentFlashcard.id;
                $location
                    .path('/Player/' 
                        + flashcardListId + '/' 
                        + flashcardId);
            }

            service
                .getFlashcards(flashcardListId)
                .then(function(result) {
                    $scope.flashcards = result;
                    var flashcardId = $routeParams.flashcardId || $scope.flashcards[0].id;
                    $scope.currentFlashcard = findFlashcardWithId($scope.flashcards, flashcardId);
                    
                    updateRenderedText();                    
                    goToCurrentPathLocation()
                });


            $scope.toggleFrontBack = function() {
                $scope.isFront = !$scope.isFront;
                updateRenderedText();
            };

            $scope.goToNextFlashcard = function() {
                var currentIndex = $scope.flashcards.indexOf($scope.currentFlashcard);
                var nextIndex = (currentIndex + 1) % $scope.flashcards.length;

                $location.path('/Player/' 
                                + flashcardListId + '/' 
                                + $scope.flashcards[nextIndex].id);
            };
    });