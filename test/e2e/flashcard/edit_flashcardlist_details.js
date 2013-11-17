'use strict'

describe('View details for flashcardlist', function() {

    beforeEach(function() {
        browser().navigateTo('/');
        restartDB();
        sleep(0.3);
        browser().navigateTo('/#/FlashcardList/someFlashcardListId1');
    });  

    it('should not contain the "save" button in preview mode', function() {
        // then
        expect(element('.flashcards-container > div:nth-child(1) > .front .save:visible').count()).toBe(0);
    });

    it('should contain the "save" button in edit mode', function() {
        // given
        element('.flashcards-container > div:nth-child(1) > .front markdown-editor div').dblclick();

        // then
        expect(element('.flashcards-container > div:nth-child(1) > .front .save:visible').count()).toBe(1);
    });
});