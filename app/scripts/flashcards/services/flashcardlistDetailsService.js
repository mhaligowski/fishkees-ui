'use strict'

angular.module('flashcardModule.services')
    .service('flashcardListDetailsService', function(Flashcards, FlashcardLists) {
        this.getListDetails = function(listId) {
            return FlashcardLists.get( { flashcardListId: listId } );
        };

        this.getFlashcards = function(listId) {
            return Flashcards.query( { flashcardListId: listId } );
        }
    });