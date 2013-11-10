'use strict'

angular.module('flashcardListModule.services')
    .factory('Flashcards', function ($resource, RestAdressService) {
        var url = RestAdressService.getAddress('flashcardlists/');

        return $resource(url + ":flashcardListId/flashcards");
    });