'use strict'

describe('Removing flashcards from the list', function() {
   
    var INITIAL_FLASHCARDS_COUNT = 2;

    beforeEach(function() {
        browser().navigateTo('/');
        restartDB();
        sleep(0.3);
        browser().navigateTo('/#/FlashcardList/someFlashcardListId1');
    });

    it('should show remove buttons for each of the flahscard', function() {
        var button = '.flashcards-container > .flashcard > .toolbox > .remove-flashcard';
        expect(
            repeater(button).count()
            ).toBe(INITIAL_FLASHCARDS_COUNT);
    });

    it('should show modal when clicking on the remove button', function() {
        // when
        element(":button.remove-flashcard:first").click();

        // then
        expect(element(".modal.remove-flashcard-modal").count()).toBe(1);
    });

    it('should hide the modal and remain the flashcards upon clicking cancel', function() {
        // when
        element(':button.remove-flashcard:first').click();
        element(':button.close-modal').click();

        // then
        expect(element('.modal.remove-flashcard-modal').count()).toBe(0);
        expect(element('.flashcards-container > div').count()).toBe(INITIAL_FLASHCARDS_COUNT);
    });

    it('should hide the modal and remove the flashcard from the list upon confirming', function() {
        // when
        element(':button.remove-flashcard:first').click();
        element(':button.confirm').click();

        // then
        expect(element('.modal.remove-flashcard-modal').count()).toBe(0);
        expect(element('.flashcards-container > div').count()).toBe(INITIAL_FLASHCARDS_COUNT - 1);

        expect(element('.flashcards-container > div:nth-child(1) > .front').text()).toMatch('front 2');
        expect(element('.flashcards-container > div:nth-child(1) > .back').text()).toMatch('back 2');
    });
});