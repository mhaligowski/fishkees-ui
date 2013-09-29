angular.module('flashcardListModule.services')
    .factory('FlashcardLists', function($resource) {
        return $resource('flashcardlists/:flashcardlistId');
    })
