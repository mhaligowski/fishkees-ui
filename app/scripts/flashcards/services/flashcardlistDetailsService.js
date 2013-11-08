'use strict'

angular.module('flashcardModule.services')
    .service('flashcardlistDetailsService', function(FlashcardLists) {
        this.getListDetails = function(listId) {
            return FlashcardLists.get( { flashcardListId: listId } );
        }
    });