describe('Edit flashcardlist scenarios', function() {
 
  describe('The view', function() {
 
    beforeEach(function() {
      browser().navigateTo('/#/FlashcardLists');
    }); 

    it('should not contain a modal after starting the page', function() {
      expect(element('.modal.edit-list-modal').count()).toBe(0);
    });

    it('should show edit modal after clicking on the first edit button', function() {
        element('.flashcard-list-container > div:first :button.edit-flashcard-list').click();

        expect(element('.modal.edit-list-modal').count()).toBe(1);
        expect(input('list.title').val()).toMatch('Spanish for beginners');
    });

  });
});