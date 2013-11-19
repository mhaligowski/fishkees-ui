'use strict'

angular.scenario.dsl('fishkees', function() {
    var api = {};

    api.addNewFlashcardButton = function() {
        return this.dsl.element(".add-flashcard.btn");
    };

    api.goToPageWithNoFlashcards = function() {
        this.dsl.browser().navigateTo('/#/FlashcardList/someFlashcardListId2');
    };

    api.goToPageWithSomeFlashcards = function() {
        this.dsl.browser().navigateTo('/#/FlashcardList/someFlashcardListId1');
    }

    return function() { return api; };
});