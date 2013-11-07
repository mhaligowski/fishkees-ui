'use strict'

describe('View details for flashcardlist', function() {
    
    beforeEach(function() {
        browser().navigateTo('/');
        restartDB();
        sleep(0.3);
    });  

    it('should not redirect when going to the page', function() {
        // when
        browser().navigateTo('/#/FlashcardList/12345');

        // then
        expect(browser().window().hash()).toBe('/FlashcardList/12345');
    });
});