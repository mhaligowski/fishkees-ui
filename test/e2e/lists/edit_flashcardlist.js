describe('Edit flashcardlist scenarios', function() {
 
  describe('The view', function() {
 
    beforeEach(function() {
      browser().navigateTo('/#/FlashcardLists');
    }); 
 
    it('after clicking on the first item, it should change to input, one should not be able edit nor remove', function() {
        expect(element('.flashcard-list-container > div:first span.flashcard-list-title').count()).toBe(1);
        expect(element('.flashcard-list-container > div:first input.flashcard-list-title').count()).toBe(0);

        element('.flashcard-list-container > div:first span.flashcard-list-title').click();

        expect(element('.flashcard-list-container > div:first span.flashcard-list-title').count()).toBe(0);
        expect(element('.flashcard-list-container > div:first input.flashcard-list-title').count()).toBe(1);

    });

  });
});