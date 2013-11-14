'use strict'

describe('View details for flashcardlist', function() {
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

});