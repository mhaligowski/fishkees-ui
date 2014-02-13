'use strict'

describe('Player with empty flashcard set', function() {
    beforeEach(function() {
        browser().navigateTo('/');
        restartDB();
        sleep(0.3);
        browser().navigateTo('/#/Player/someFlashcardListId3');
    });

   
    it('should display a message informing that there is no flashcards', function() {
        expect(element('.empty-list-message').count()).toBe(1);
    }); 

    it('should not display the contents or navigation', function() {
        expect(element('.flashcard-buttons').count()).toBe(0);
    });
});