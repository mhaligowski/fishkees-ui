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
        var button = '.flashcards-container > .flashcard > .toolbox > .remove-flashcard';
        expect(
            repeater(button).count()
            ).toBe(INITIAL_FLASHCARDS_COUNT);
    });

    it('should show modal when clicking on the remove button', function() {
        element(":button.remove-flashcard:first").click();
        expect(element(".modal.remove-flashcard-modal").count()).toBe(1);
    });
});