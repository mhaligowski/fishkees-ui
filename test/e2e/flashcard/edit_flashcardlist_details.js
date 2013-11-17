'use strict'

describe('Edit details for flashcardlist', function() {

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
        // when
        element('.flashcards-container > div:nth-child(1) > .front markdown-editor div').dblclick();

        // then
        expect(element('.flashcards-container > div:nth-child(1) > .front .save:visible').count()).toBe(1);
    });

    it('should save the new text upon editing', function() {
        // when
        element('.flashcards-container > div:nth-child(1) > .front markdown-editor div').dblclick();
        element('.flashcards-container > div:nth-child(1) > .front textarea').val('brand *new* text');
        element('.flashcards-container > div:nth-child(1) > .front .save:visible').click();

        // then
        expect(element('.flashcards-container > div:nth-child(1) > .front').html()).toContain('brand <em>new</em> text');
    });

    it('should save the new text upon refreshing the page', function() {
        // when
        element('.flashcards-container > div:nth-child(1) > .front markdown-editor div').dblclick();
        element('.flashcards-container > div:nth-child(1) > .front textarea').val('brand *new* text');
        element('.flashcards-container > div:nth-child(1) > .front .save:visible').click();
        browser().reload();

        // then
        expect(element('.flashcards-container > div:nth-child(1) > .front .preview').html()).toContain('brand <em>new</em> text');
    });
});