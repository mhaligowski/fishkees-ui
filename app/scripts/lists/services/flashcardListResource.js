angular.module('flashcardListModule.services')
    .factory('FlashcardLists', function($resource, RestAdressService) {
        var url = RestAdressService.getAddress('flashcardlists');
        return $resource(url + "/:flashcardListId", {}, {
            'update': {
                'method': 'PUT',
                'params': {
                    'flashcardListId': '@id'
                }
            }
        });
    });
