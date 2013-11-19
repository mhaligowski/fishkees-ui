'use strict'

describe('Add new flashcard', function() {
    beforeEach(function() {
        browser().navigateTo('/');
        restartDB();
        sleep(0.3);
        browser().navigateTo('/#/FlashcardList/someFlashcardListId1');
    });  

    it('should show the add button', function() {
        expect(fishkees().addNewFlashcardButton().count()).toBe(1);
    });
});