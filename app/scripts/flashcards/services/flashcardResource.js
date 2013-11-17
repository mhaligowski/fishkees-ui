'use strict'

angular.module('flashcardListModule.services')
    .factory('Flashcards', function ($resource, RestAdressService) {
        var url = RestAdressService.getAddress('flashcardlists/');

        return $resource(url + ":flashcard_list_id/flashcards/:id", 
            {},
            {
                'update': {
                    'method': 'PUT',
                    'params': {
                        'flashcard_list_id': '@flashcard_list_id',
                        'id': '@id'
                    }
                }
            });
    });