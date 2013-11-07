'use strict'

describe('FlashcardListDetailsCtrl controller', function() {
   
    var FlashcardListDetailsCtrl,
        mockService,
        mockParams,
        $scope;

    beforeEach(function() {
        var testList = {
                "id": "someNiceId1",
                "title": "Spanish for beginners",
                "create_date": 1379617022000
            };
        module('flashcardModule');

        // mock service
        mockService = jasmine.createSpyObj('flashcardlistDetailsService', 
            ['getListDetails', 'getFlashcards']);
        mockService.getListDetails.andCallFake(function() { return testList; });

        // mock params
        mockParams = { id: "someNiceId1" };

        module(function ($provide) {
            $provide.value('flashcardlistDetailsService', mockService);
        });

        inject(function ($controller, $rootScope) {
            $scope = $rootScope.$new();

            FlashcardListDetailsCtrl = $controller('FlashcardListDetailsCtrl', {
                $scope: $scope,
                $routeParams: mockParams
            });
        });
    });

    it('should give the title from the flashcardListResource', function() {
        expect($scope.list.title).toBe("Spanish for beginners");
        expect(mockService.getListDetails).toHaveBeenCalledWith("someNiceId1");
    });
});