'use strict';

describe('Player', function() {
    describe('with particular flashcard given', function() {
        beforeEach(function() {
            browser().navigateTo('/');
            restartDB();
            sleep(0.3);
            browser().navigateTo('/#/Player/someFlashcardListId1/someId2');
        });

        it('should not go to the first flashcard in the list', function() {
            // then
            expect(browser().window().hash()).toBe('/Player/someFlashcardListId1/someId2');
        });

    });

    describe('with no flashcard given', function() {
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
