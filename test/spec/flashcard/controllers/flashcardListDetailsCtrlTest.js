'use strict'

describe('FlashcardListDetailsCtrl controller', function() {
   
    var FlashcardListDetailsCtrl,
        mockService,
        $scope;

    beforeEach(function() {
        var testList = {
                "id": "someNiceId1",
                "title": "Spanish for beginners",
                "create_date": 1379617022000
            };
        module('flashcardModule');

        mockService = jasmine.createSpyObj('flashcardlistDetailsService', 
            ['getListDetails', 'getFlashcards']);
        mockService.getListDetails.andCallFake(function() { return testList; });

        module(function ($provide) {
            $provide.value('flashcardlistDetailsService', mockService);
        });

        inject(function ($controller, $rootScope) {
            $scope = $rootScope.$new();

            FlashcardListDetailsCtrl = $controller('FlashcardListDetailsCtrl', {
                $scope: $scope
            });
        });
    });

    it('should give the title from the flashcardListResource', function() {

    });
});