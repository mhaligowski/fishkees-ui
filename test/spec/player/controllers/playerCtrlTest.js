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

        mockLocation = jasmine.createSpyObj('$location', [ 'path' ]);

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
        var testObj,
            deferred;

        beforeEach(function() {
            deferred = $q.defer();
            mockService.getFlashcards.andReturn(deferred.promise);

            testObj = $controller('PlayerCtrl', {
                $scope: $rootScope.$new(),
                $routeParams: { 'flashcardListId': 'mockFlashcardList' },
            });

        });

        it('should redirect to given flashcard', function() {
            // given
            deferred.resolve(testData);

            // when
            $rootScope.$digest();

            // then
            expect(mockService.getFlashcards).toHaveBeenCalledWith('mockFlashcardList');
            expect(mockLocation.path).toHaveBeenCalledWith('/Player/mockFlashcardList/someId1');
        });
    });

    describe('with flashcard given', function() {
        var testObj,
            deferred;

        beforeEach(function() {
            deferred = $q.defer();
            mockService.getFlashcards.andReturn(deferred.promise);

            testObj = $controller('PlayerCtrl', {
                $scope: $rootScope.$new(),
                $routeParams: {
                    'flashcardListId': 'mockFlashcardList',
                    'flashcardId': 'mockFlashcard'
                },
            });

        });

        it('should remain at given flashcard', function() {
            // given
            deferred.resolve(testData);

            // when
            $rootScope.$digest();

            // then
            expect(mockService.getFlashcards).toHaveBeenCalledWith('mockFlashcardList');
            expect(mockLocation.path).not.toHaveBeenCalled();
        });
    });
});