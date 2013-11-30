'use strict'
var testData = [
    {
        id: "someId1",
        flashcard_list_id: "someNiceId1",
        front: "front 1",
        back: "back 1",
        create_date: 520603200000
    },
    {
        id: "someId3",
        flashcard_list_id: "someNiceId1",
        front: "front 3",
        back: "back 3",
        create_date: 520603200000
    }];

describe('PlayerCtrl', function() {
    var $controller,
        $rootScope,
        $q,
        mockLocation,
        mockService;

    beforeEach(function() {
        module('flashcardPlayerModule.controllers');

        mockService = jasmine.createSpyObj('flashcardListDetailsService', 
            [
                'getListDetails', 
                'getFlashcards', 
                'removeFlashcardFromList', 
                'updateFlashcard',
                'createNewFlashcard'
            ]);

        mockService.getFlashcards.andReturn(testData);

        mockLocation = jasmine.createSpyObj('$location', [ 'hash' ]);

        module(function ($provide) {
            $provide.value('flashcardListDetailsService', mockService);
            $provide.value('$location', mockLocation);
        });

        inject(function (_$controller_, _$rootScope_, _$q_) {
            $controller = _$controller_;
            $rootScope = _$rootScope_;
            $q = _$q_;
        });

    });

    describe('with no flashcard given', function() {
        var testObj;

        beforeEach(function() {
            testObj = $controller('PlayerCtrl', {
                $scope: $rootScope.$new(),
                $routeParams: { 'flashcardListId': 'mockFlashcardList' },
            });
        });

        it('should redirect to given flashcard', function() {
            // when
            $rootScope.$apply();

            // then
            expect(mockService.getFlashcards).toHaveBeenCalledWith('mockFlashcardList');
            expect(mockLocation.hash).toHaveBeenCalledWith('/Player/mockFlashcardList/someId1');
        });
    });
});