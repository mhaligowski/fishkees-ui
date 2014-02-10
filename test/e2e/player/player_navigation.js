'use strict'

describe('Player flashcard navigation', function() {
    describe('next flashcard', function() {
        beforeEach(function() {
            browser().navigateTo('/');
            restartDB();
            sleep(0.3);
            browser().navigateTo('/#/Player/someFlashcardListId1');
        });

        it('should go to the next flashcard upon clicking next', function() {
            // when
            element('.flashcard-buttons .next:button').click();

            // then
            expect(browser().window().hash()).toBe('/Player/someFlashcardListId1/someId2');
        });

        it('should display the next flashcard front upon clicking next', function() {
            // when
            element('.flashcard-buttons .next:button').click();

            // then
            expect(element('.flashcard-contents').html()).toContain('<strong>front 2</strong>');
        });

        it('should display the next flashcard front upon clicking next from back side', function() {
            // when
            element('.flashcard-buttons .show-back:button').click();            
            element('.flashcard-buttons .next:button').click();

            // then
            expect(element('.flashcard-contents').html()).toContain('<strong>front 2</strong>');
        });

        it('should cycle over the flashcards around', function() {
            // when
            element('.flashcard-buttons .next:button').click();
            element('.flashcard-buttons .next:button').click();

            // then
            expect(element('.flashcard-contents').html()).toContain('<em>front 1</em>');
        });

    });

    xdescribe('previous flashcard', function() {
        beforeEach(function() {
            browser().navigateTo('/');
            restartDB();
            sleep(0.3);
            browser().navigateTo('/#/Player/someFlashcardListId2/someId2');
        });

        it('should go to the previous flashcard upon clicking previous', function() {
            // when
            element('.flashcard-buttons .prev:button').click();

            // then
            expect(browser().window().hash()).toBe('/Player/someFlashcardListId1/someId1');
        });

        it('should display the previous flashcard front upon clicking previous', function() {
            // when
            element('.flashcard-buttons .prev:button').click();

            // then
            expect(element('.flashcard-contents').html()).toContain('<em>front 1</em>');
        });

        it('should display the previous flashcard front upon clicking previous from back side', function() {
            // when
            element('.flashcard-buttons .show-back:button').click();            
            element('.flashcard-buttons .prev:button').click();

            // then
            expect(element('.flashcard-contents').html()).toContain('<em>front 1</em>');
        });

        it('should cycle over the flashcards around', function() {
            // when
            element('.flashcard-buttons .prev:button').click();
            element('.flashcard-buttons .prev:button').click();

            // then
            expect(element('.flashcard-contents').html()).toContain('<strong>front 2</strong>');
        });
    });
});
