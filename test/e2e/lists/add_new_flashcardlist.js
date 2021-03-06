'use strict'

describe('Add new flashcardlist scenarios', function() {
 
  describe('The view', function() {
    var INITIAL_NUMBER_OF_LISTS = 3;

    beforeEach(function() {
        browser().navigateTo('/');
        restartDB();
        sleep(0.3);
        browser().navigateTo('/#/FlashcardList');
    }); 
 
    it('should contain a button for adding new flashcardlist', function() {
      expect(element('button.add-new-list').count()).toBe(1);
    });

    it('should not contain a modal after starting the page', function() {
      var modalElement = element('.modal.add-new-list-modal');
      expect(modalElement.count()).toBe(0);
    });

    it('should be a modal appearing after clicking the button', function() {
      element(':button.add-new-list').click();
      expect(element('.modal.add-new-list-modal').count()).toBe(1);
    });

    it('should show a modal after clicking the button and close it after clicking cancel', function() {
      element(':button.add-new-list').click();
      element('.modal.add-new-list-modal :button.close-button').click();
      expect(element('.modal.add-new-list-modal').count()).toBe(0);
    });

    it('should close the modal and add new list after clicking Add button in modal', function() {
      // when
      expect(repeater('.flashcard-list-container > div').count()).toBe(INITIAL_NUMBER_OF_LISTS);

      element(':button.add-new-list').click();
      input('modalObject.title').enter('Learning JavaScript');
      element(':button.add-button').click();

      // then
      expect(element('.modal.add-new-list-modal').count()).toBe(0);
      expect(repeater('.flashcard-list-container > div').count()).toBe(INITIAL_NUMBER_OF_LISTS + 1);
      expect(element('.flashcard-list-container > div:first').text()).toContain("Learning JavaScript");
    });
    
    it('should close the modal and add new list after clicking Add button in modal and refresh', function() {
      // when
      expect(repeater('.flashcard-list-container > div').count()).toBe(INITIAL_NUMBER_OF_LISTS);

      element(':button.add-new-list').click();
      input('modalObject.title').enter('Learning JavaScript');
      element(':button.add-button').click();

      browser().reload();

      // then
      expect(element('.modal.add-new-list-modal').count()).toBe(0);
      expect(repeater('.flashcard-list-container > div').count()).toBe(INITIAL_NUMBER_OF_LISTS + 1);
    });
  });
});