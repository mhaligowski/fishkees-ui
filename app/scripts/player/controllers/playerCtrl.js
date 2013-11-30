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
                flashcardListId = $routeParams.flashcardListId,
                flashcardId = $routeParams.flashcardId;


            service
                .getFlashcards(flashcardListId)
                .then(function(result) {
                    $scope.flashcards = result;
                    
                    if (!flashcardId) {
                        $location
                            .path('/Player/' 
                                + flashcardListId + '/' 
                                + $scope.flashcards[0].id);
                    }
                });


    });