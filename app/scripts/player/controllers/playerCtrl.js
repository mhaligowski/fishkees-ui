'use strict'

angular
    .module('flashcardPlayerModule.controllers')
    .controller(
        'PlayerCtrl', 
        function($scope,
                 $routeParams,
                 flashcardListDetailsService) {
            var service = flashcardListDetailsService,
                flashcardListId = $routeParams.flashcardListId,
                flashcardId = $routeParams.flashcardId || service.getFlashcards(flashcardListId);

    });