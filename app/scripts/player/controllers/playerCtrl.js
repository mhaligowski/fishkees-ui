'use strict'

angular
    .module('flashcardPlayerModule.controllers')
    .controller(
        'PlayerCtrl', 
        function($scope,
                 $route,
                 $routeParams,
                 $location,
                 $sce,
                 flashcardListDetailsService) {
            var flashcards = [],
                currentFlashcard = {};
            $scope.renderedText = "";
            $scope.isFront = true;

            var service = flashcardListDetailsService,
                flashcardListId = $routeParams.flashcardListId,
                converter = new Showdown.converter();

            var findFlashcardWithId = function(flashcardsList, searchedFlashcardId) {
                return flashcardsList.filter(function(f) { return f.id === searchedFlashcardId; })[0];
            };

            var updateRenderedText = function() {
                var newText = $scope.isFront === true 
                    ? currentFlashcard.front
                    : currentFlashcard.back;
                $scope.renderedText = $sce.trustAsHtml(converter.makeHtml(newText));                
            };

            var goToCurrentPathLocation = function() {
                var flashcardId = currentFlashcard.id;
                $location
                    .path('/Player/' 
                        + flashcardListId + '/' 
                        + flashcardId);
            };

            var preventAddressChangeFromReloading = function() {
                var lastRoute = $route.current;
                $scope.$on('$locationChangeSuccess', function(event) {
                    $route.current = lastRoute;
                });
            };

            service
                .getFlashcards(flashcardListId)
                .then(function(result) {
                    flashcards = result;
                    var flashcardId = $routeParams.flashcardId || flashcards[0].id;
                    currentFlashcard = findFlashcardWithId(flashcards, flashcardId);
                    
                    updateRenderedText();                    
                    goToCurrentPathLocation()
                });

            preventAddressChangeFromReloading();

            $scope.toggleFrontBack = function() {
                $scope.isFront = !$scope.isFront;
                updateRenderedText();
            };

            var goToFlashcard = function(idx) {
                currentFlashcard = flashcards[idx];
                $scope.isFront = true;
                
                updateRenderedText();
                goToCurrentPathLocation();
            };

            $scope.goToNextFlashcard = function() {
                var idx = flashcards.indexOf(currentFlashcard);
                var nextIndex = (idx + 1) % flashcards.length;

                goToFlashcard(nextIndex);
            };

            $scope.goToPreviousFlashcard = function() {
                var idx = flashcards.indexOf(currentFlashcard);
                var nextIndex = (idx - 1 + flashcards.length) % flashcards.length;

                goToFlashcard(nextIndex);
            }
    });