angular.module('flashcardListModule.services')
    .factory('FlashcardLists', function(FishkeesResource, RestAdressService) {
        var url = RestAdressService.getAddress('flashcardlists');
        return FishkeesResource(url);
    });
