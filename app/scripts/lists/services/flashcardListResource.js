angular.module('flashcardListModule.flashcardListResource', ['ngResource'])
    .factory('FlashcardLists', function($resource) {
        return $resource('flashcardlists/:flashcardlistId', {}, {
            query: {method: 'GET', isArray: true},
            save: {method: 'POST'} 
        });
    })
