'use strict'

describe('Add new flashcard', function() {
    var _;

    beforeEach(function() {
        _ = fishkees();
        browser().navigateTo('/');
        restartDB();
        sleep(0.3);
        _.goToPageWithSomeFlashcards();
    });  

    it('should show the add button when there are some flashcards', function() {
        // then
        expect(_.addNewFlashcardButton().count()).toBe(1);
    });

    it('should show the add button when there are no flashcards', function() {
        // when
        _.goToPageWithNoFlashcards();

        // then
        expect(_.addNewFlashcardButton().count()).toBe(1);
    });

});