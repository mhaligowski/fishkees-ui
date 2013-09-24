describe('Add new flashcardlist scenarios', function() {
 
  describe('The view', function() {
 
    beforeEach(function() {
      browser().navigateTo('/#/FlashcardLists');
    });
 
    it('should contain a button for removing flashcardlist', function() {
      expect(element('.flashcard-list-container > div').count()).toBe(2);
      expect(element('.flashcard-list-container button.remove-flashcard-list').count()).toBe(2);
    });

    it('should not contain a modal after starting the page', function() {
      var modalElement = element('.modal.remove-list-modal');
      expect(modalElement.count()).toBe(0);
    });

    it('should be a modal appearing after clicking the button', function() {
      element(':button.remove-flashcard-list:first').click();
      expect(element('.modal.remove-list-modal').count()).toBe(1);
    });

  });
});