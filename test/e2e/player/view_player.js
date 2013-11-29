'use strict';

ddescribe('Player', function() {
    describe('Single flashcard', function() {
        beforeEach(function() {
            browser().navigateTo('/');
            restartDB();
            sleep(0.3);
            browser().navigateTo('/#/Player/someFlashcardListId1/12345');
        });  

        it('should not redirect when going to the page', function() {
            // then
            expect(browser().window().hash()).toBe('/Player/someFlashcardListId1/12345');
        });
    });

    describe('Flashcard list', function() {
        beforeEach(function() {
            browser().navigateTo('/');
            restartDB();
            sleep(0.3);
            browser().navigateTo('/#/Player/someFlashcardListId1');
        });

        it('should go to the first flashcard in the list', function() {
            // then
            expect(browser().window().hash()).toBe('/Player/someFlashcardListId1/someId1');
        });
    });
});
