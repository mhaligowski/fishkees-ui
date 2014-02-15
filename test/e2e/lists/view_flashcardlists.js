'use strict'

describe('Flashcardlists view', function() {
    beforeEach(function() {
        browser().navigateTo('/');
        restartDB();
        sleep(0.3);
        browser().navigateTo('/#/FlashcardList');
    });

    it('should contain link to the flashcardlist details', function() {
        // when
        element('.flashcard-list-container > .flashcardlist:nth-child(1) .flashcard-list-title').click();

        // then
        expect(browser().window().hash()).toBe('/FlashcardList/someFlashcardListId3');
        expect(element('.page-header').text()).toContain('List with no flashcards');
    });
});