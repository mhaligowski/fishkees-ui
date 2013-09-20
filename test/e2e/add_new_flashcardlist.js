describe('Add new flashcardlist scenarios', function() {
 
  describe('The view', function() {
 
    beforeEach(function() {
      browser().navigateTo('/#/FlashcardLists');
    });
 
 
    it('should contain a button for adding new flashcardlist', function() {
      expect(element('button.add-new-list').count()).toBe(1);
    });

    it('should not contain a modal after starting the page', function() {
      var modalElement = element('.modal');
      expect(modalElement.count()).toBe(0);
    });

    it('should be a modal appearing after clicking the button', function() {
      element(':button.add-new-list').click();
      expect(element('.modal.add-new-list-modal').count()).toBe(1);
    });

    it('should show a modal after clicking the button and close it after clicking cancel', function() {
      element(':button.add-new-list').click();
      element('.modal.add-new-list-modal :button.close-button').click();
      sleep(1);
      expect(element('.modal.add-new-list-modal').count()).toBe(0);
    });
  });
});