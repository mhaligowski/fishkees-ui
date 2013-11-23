'use strict'

describe('Flashcardlists view', function() {
    beforeEach(function() {
        browser().navigateTo('/');
        restartDB();
        browser().navigateTo('/#/FlashcardList');
    });

    it('should link to the flashcardlist details', function() {
        // when
        element('.flashcard-list-container > .flashcardlist:nth-child(1) .flashcard-list-title').click();
        sleep(1);

        // then
        expect(browser().window().hash()).toBe('/FlashcardList/someFlashcardListId3');
        expect(element('.page-header').text()).toContain('List with no flashcards');
    });
});