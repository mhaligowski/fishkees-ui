angular.module('flashcardListModule.services')
    .factory('FlashcardLists', function($resource, RestAdressService) {
        var adress = RestAdressService.getAddress('flashcardlists/:flashcardlistId');
        return $resource(adress);
    })
