'use strict'

angular.module('flashcardModule.services')
    .service('flashcardListDetailsService', function(Flashcards, FlashcardLists) {
        this.getListDetails = function(listId) {
            return FlashcardLists
                .get( { flashcardListId: listId } )
                .$promise;
        };

        this.getFlashcards = function(listId) {
            return Flashcards
                .query( { flashcard_list_id: listId } )
                .$promise;
        };

        this.removeFlashcardFromList = function(flashcard, flashcards) {
            var params = {
                flashcard_list_id: flashcard.flashcard_list_id,
                id: flashcard.id
            };

            var createNewListWithoutElement = function(response) {
                var result = flashcards.slice(0);
                for (var f in flashcards) {
                    if (flashcards[f].id === flashcard.id) {
                        result.splice(f, 1);
                        return result;
                    }
                }
            };

            return Flashcards
                .remove(params)
                .$promise
                .then(createNewListWithoutElement);
        };

        this.updateFlashcard = function(flashcard) {
            return Flashcards
                .update(flashcard)
                .$promise;
        }

        this.createNewFlashcard = function(listId) {
            var newFlashcard = new Flashcards({
                flashcard_list_id: listId
            });

            return Flashcards
                .save(newFlashcard)
                .$promise;
        }
    }); 
