'use strict'

describe('View details for flashcardlist', function() {
    
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
});