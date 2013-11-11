'use strict'

describe('Removing flashcards from the list', function() {
   
    var INITIAL_FLASHCARDS_COUNT = 2;

    beforeEach(function() {
        browser().navigateTo('/');
        restartDB();
        sleep(0.3);
        browser().navigateTo('/#/FlashcardList/someFlashcardListId1');
    });

    it('should show remove buttons for each of the flahscard', function() {
        expect(
            repeater('.flashcards-container > .flashcard > .toolbox > .remove-flashcard').count()
            ).toBe(INITIAL_FLASHCARDS_COUNT);
    });
});