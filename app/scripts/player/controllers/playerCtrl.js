'use strict'

angular
    .module('flashcardPlayerModule.controllers')
    .controller(
        'PlayerCtrl', 
        function($scope,
                 $routeParams,
                 $location,
                 flashcardListDetailsService) {
            var service = flashcardListDetailsService,
                flashcardListId = $routeParams.flashcardListId;

            service
                .getFlashcards(flashcardListId)
                .then(function(result) {
                    $scope.flashcards = result;
                    $location.path('/Player/' + flashcardListId + '/' + $scope.flashcards[0].id);
                });


    });