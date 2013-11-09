'use strict'

angular.module('flashcardModule.services')
    .service('flashcardListDetailsService', function(FlashcardLists) {
        this.getListDetails = function(listId) {
            return FlashcardLists.get( { flashcardListId: listId } );
        }
    });