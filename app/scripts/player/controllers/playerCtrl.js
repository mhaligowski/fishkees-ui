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
                flashcards = service.getFlashcards(flashcardListId);

            $location.hash('/Player/' + flashcardListId + '/' + flashcards[0].id);

    });