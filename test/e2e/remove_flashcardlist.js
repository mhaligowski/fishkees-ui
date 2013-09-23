describe('Add new flashcardlist scenarios', function() {
 
  describe('The view', function() {
 
    beforeEach(function() {
      browser().navigateTo('/#/FlashcardLists');
    });
 
 
    it('should contain a button for adding new flashcardlist', function() {
      expect(element('button.add-new-list').count()).toBe(1);
    });

  });
});