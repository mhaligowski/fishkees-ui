describe('Edit flashcardlist scenarios', function() {
 
  describe('The view', function() {
 
    beforeEach(function() {
        browser().navigateTo('/');
        restartDB();
        browser().navigateTo('/#/FlashcardList');
    }); 

    it('should not contain a modal after starting the page', function() {
        expect(element('.modal.edit-list-modal').count()).toBe(0);
    });

    it('should show edit modal after clicking on the second edit button', function() {
        element('.flashcard-list-container > div:nth-child(2) :button.edit-flashcard-list').click();

        expect(element('.modal.edit-list-modal').count()).toBe(1);
        expect(input('list.title').val()).toMatch('Spanish for beginners');
    });

    it('should do nothing after clicking the cancel button', function() {
        element('.flashcard-list-container > div:nth-child(2) :button.edit-flashcard-list').click();
        expect(element('.modal.edit-list-modal').count()).toBe(1);

        input('list.title').enter('Klingon for beginners');
        element('.modal .close-button').click();

        expect(element('modal.edit.list-modal').count()).toBe(0);

        var titleElement = element('.flashcard-list-container > div:nth-child(2) span.flashcard-list-title');
        expect(titleElement.text()).toBe('Spanish for beginners');
    });

    it('should change the list title after clicking the ok button', function() {
        element('.flashcard-list-container > div:first :button.edit-flashcard-list').click();
        expect(element('.modal.edit-list-modal').count()).toBe(1);

        input('list.title').enter('Klingon for beginners');
        element('.modal .save-button').click();

        expect(element('modal.edit.list-modal').count()).toBe(0);

        var titleElement = element('.flashcard-list-container > div:first span.flashcard-list-title');
        expect(titleElement.text()).toBe('Klingon for beginners');
    });

    it('should change the list and remain after refresh', function() {
        element('.flashcard-list-container > div:first :button.edit-flashcard-list').click();
        expect(element('.modal.edit-list-modal').count()).toBe(1);

        input('list.title').enter('Klingon for beginners');
        element('.modal .save-button').click();

        expect(element('modal.edit.list-modal').count()).toBe(0);

        var titleElement = element('.flashcard-list-container > div:first span.flashcard-list-title');
        expect(titleElement.text()).toBe('Klingon for beginners');

        browser().reload();
        expect(repeater('.flashcard-list-container > div').count()).toBe(2);
    });

    it('should ensure sorting at editing', function() {
        element('.flashcard-list-container > div:nth-child(2) :button.edit-flashcard-list').click();
        expect(element('.modal.edit-list-modal').count()).toBe(1);

        input('list.title').enter('AAAAA');
        element('.modal .save-button').click();

        expect(element('modal.edit.list-modal').count()).toBe(0);

        var titleElement = element('.flashcard-list-container > div:first span.flashcard-list-title');
        expect(titleElement.text()).toBe('AAAAA');

        browser().reload();
        expect(repeater('.flashcard-list-container > div').count()).toBe(2);
    });
  });
});