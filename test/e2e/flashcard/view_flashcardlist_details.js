'use strict'

describe('View for flashcardlist details', function() {
    var LIST1_COUNT = 2;
    
    beforeEach(function() {
        browser().navigateTo('/');
        restartDB();
        sleep(0.3);
        browser().navigateTo('/#/FlashcardList/someFlashcardListId1');
    });  

    it('should not redirect when going to the page', function() {
        // then
        expect(browser().window().hash()).toBe('/FlashcardList/someFlashcardListId1');
    });

    it('should show the proper title when going to the page', function() {
        expect(element('.page-header > h1').text()).toBe("Spanish for beginners");
    });

    it('should show a friendly message when there is no flashcards', function() {
        // given
        browser().navigateTo("/#/FlashcardList/someFlashcardListId3");

        // then
        expect(element('.page-header > h1').text()).toBe("List with no flashcards");
        expect(element('.flashcards-container > tr').count()).toBe(0);
        expect(element('.no-flashcards-message').count()).toBe(1);
    });

    it('should not show a message when entering the non-empty list', function() {
        expect(element('.no-flashcards-message').count()).toBe(0);
    });

    it('should display list markdowned list of flashcards when entering the non-empty list', function() {
        // then
        expect(element('.flashcards-container > div').count()).toBe(LIST1_COUNT);

        expect(element('.flashcards-container > div:nth-child(1) > .front').html()).toContain('<em>front 1</em>');
        expect(element('.flashcards-container > div:nth-child(1) > .back').html()).toContain('<em>back 1</em>');

        expect(element('.flashcards-container > div:nth-child(2) > .front').html()).toContain('<strong>front 2</strong>');
        expect(element('.flashcards-container > div:nth-child(2) > .back').html()).toContain('<strong>back 2</strong>');
    });

    it('should not display textarea by default', function() {
        expect(element('.flashcards-container > div > .front textarea:visible').count()).toBe(0);
    });

    it('should change the flashcard to editor after doubleclick', function() {
        // when
        element('.flashcards-container > div:nth-child(1) > .front markdown-editor div').dblclick();

        // then
        expect(element('.flashcards-container > div:nth-child(1) > .front textarea:visible').count()).toBe(1);
    });

    it('should contain the flashcard value after changing to editor after doubleclick', function() {
        // when
        element('.flashcards-container > div:nth-child(1) > .front markdown-editor div').dblclick();

        // then
        expect(element('.flashcards-container > div:nth-child(1) > .front textarea').text()).toBe("*front 1*");
    });

    it('should not contain the "cancel" button in preview mode', function() {
        // then
        expect(element('.flashcards-container > div:nth-child(1) > .front .cancel:visible').count()).toBe(0);
    });

    it('should contain the "cancel" button in editor mode', function() {
        // when
        element('.flashcards-container > div:nth-child(1) > .front markdown-editor div').dblclick();

        // then
        expect(element('.flashcards-container > div:nth-child(1) > .front .cancel:visible').count()).toBe(1);
    });

    it('should go back to preview mode when clicking "cancel"', function() {
        // when
        element('.flashcards-container > div:nth-child(1) > .front markdown-editor div').dblclick();
        element('.flashcards-container > div:nth-child(1) > .front .cancel:button').click();

        // then
        expect(element('.flashcards-container > div:nth-child(1) > .front textarea:visible').count()).toBe(0);
    });

    it('should have still the same text after clicking "cancel" button', function() {
        // when
        element('.flashcards-container > div:nth-child(1) > .front markdown-editor div').dblclick();
        element('.flashcards-container > div:nth-child(1) > .front textarea').val('brand new text');
        element('.flashcards-container > div:nth-child(1) > .front .cancel:button').click();

        // then
        expect(element('.flashcards-container > div:nth-child(1) > .front textarea').text()).toBe("*front 1*");
    });

    it('should contain link to the player', function() {
        expect(element('.go-to-player').attr('href')).toBe("/#/Player/someFlashcardListId1");
    });
});