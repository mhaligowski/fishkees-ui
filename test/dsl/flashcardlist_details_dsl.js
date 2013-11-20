'use strict'

angular.scenario.dsl('fishkees', function() {
    var api = {};

    api.addNewFlashcardButton = function() {
        return this.dsl.element('.add-flashcard.btn');
    };

    api.goToPageWithNoFlashcards = function() {
        this.dsl.browser().navigateTo('/#/FlashcardList/someFlashcardListId2');
    };

    api.goToPageWithSomeFlashcards = function() {
        this.dsl.browser().navigateTo('/#/FlashcardList/someFlashcardListId1');
    }

    api.allMarkdownEditors = function() {
        return this.dsl.element('markdown-editor');
    }

    api.markdownEditor = function(rowNr) {
        return this.dsl.using('.flashcard:nth-child(' + rowNr + ') markdown-editor');
    }

    api.isEditMode = function() {
        return this.addFutureAction('is area visible', function($window, $document, done) {
            try {
                var elem = $document.elements('textarea').filter(':visible');
                done(null, true);
            } catch (e) {
                done(null, false);
            }
        });
    }

    return function() { return api; };
});