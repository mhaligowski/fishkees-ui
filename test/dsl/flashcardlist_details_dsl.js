'use strict'

angular.scenario.dsl('fishkees', function() {
    var api = {};

    api.addNewFlashcardButton = function() {
        return this.dsl.element(".add-flashcard.btn");
    }

    return function() { return api; };
});