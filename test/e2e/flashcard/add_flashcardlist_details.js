'use strict'

describe('Add new flashcard', function() {
    beforeEach(function() {
        browser().navigateTo('/');
        restartDB();
        sleep(0.3);
        browser().navigateTo('/#/FlashcardList/someFlashcardListId1');
    });  

    it('should show the add button', function() {
        expect(element('.add-flashcard.btn').count()).toBe(1);
    });
});