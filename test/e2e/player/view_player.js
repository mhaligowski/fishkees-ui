'use strict'

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

        it('should display the contents of the card by default', function() {
            expect(element('.flashcard-contents').html()).toContain('<strong>front 2</strong>');
        });

        it('should display a link back to the flashcard set detail', function() {
            expect(element('a.back-to-flashcard-list-details').attr('href')).toBe('/#/FlashcardList/someFlashcardListId1');
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

        it('should display the contents of the card by default', function() {
            expect(element('.flashcard-contents').html()).toContain('<em>front 1</em>');
        });

        it('should show the back of the card upon clicking the button', function() {
            // when
            element('.flashcard-buttons .show-back:button').click();

            // then
            expect(element('.flashcard-contents').html()).toContain('<em>back 1</em>');
        });

        it('should show the foront of the card upon clicking the button twice', function() {
            // when
            element('.flashcard-buttons .show-back:button').click();
            element('.flashcard-buttons .show-back:button').click();

            // then
            expect(element('.flashcard-contents').html()).toContain('<em>front 1</em>');
        });

    });


});
