'use strict'

describe('Add new flashcard', function() {
    var _;
    var INITIAL_ROW_COUNT = 2;

    beforeEach(function() {
        browser().navigateTo('/');
        restartDB();
        sleep(0.3);
        fishkees().goToPageWithSomeFlashcards();
    });  

    it('should show the add button when there are some flashcards', function() {
        // then
        expect(fishkees().addNewFlashcardButton().count()).toBe(1);
    });

    it('should show the add button when there are no flashcards', function() {
        // when
        fishkees().goToPageWithNoFlashcards();

        // then
        expect(fishkees().addNewFlashcardButton().count()).toBe(1);
    });

    it('should add new markdown editor after clicking', function() {
        // when
        fishkees().addNewFlashcardButton().click();

        // then
        expect(fishkees().allMarkdownEditors().count()).toBe(2 * (INITIAL_ROW_COUNT + 1));               
    });

    it('should be in edit mode', function() {
        // when
        fishkees().addNewFlashcardButton().click();

        // then
        expect(fishkees().markdownEditor(1).fishkees().isEditMode()).toBe(true);
    });

    it('should have more flashcards after refresh', function() {
        // when
        fishkees().addNewFlashcardButton().click();
        fishkees().markdownEditor(1).fishkees().frontTextArea().val('brand *new* text');
        fishkees().markdownEditor(1).fishkees().frontOkButton().click();
        browser().reload();

        // then
        expect(fishkees().allMarkdownEditors().count()).toBe(2 * (INITIAL_ROW_COUNT + 1));
        expect(fishkees().markdownEditor(1).fishkees().frontContent().text()).toContain('brand new text');
    });

});