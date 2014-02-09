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
        mockService,
        mockSanitize;

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
        mockSanitize = jasmine.createSpyObj('$sce', [ 'trustAsHtml' ]);
        mockSanitize.trustAsHtml.andCallFake(function(p) { return p; });

        module(function ($provide) {
            $provide.value('flashcardListDetailsService', mockService);
            $provide.value('$location', mockLocation);
            $provide.value('$sce', mockSanitize);
        });

        inject(function (_$controller_, _$rootScope_, _$q_) {
            $controller = _$controller_;
            $rootScope = _$rootScope_;
            $q = _$q_;
        });

    });

    describe('with no flashcard given', function() {
        var testObj,
            scope,
            deferred;

        beforeEach(function() {
            deferred = $q.defer();
            mockService.getFlashcards.andReturn(deferred.promise);
            scope = $rootScope.$new();

            testObj = $controller('PlayerCtrl', {
                $scope: scope,
                $routeParams: { 'flashcardListId': 'mockFlashcardList' },
            });

            deferred.resolve(testData);
            $rootScope.$digest();
        });

        it('should redirect to given flashcard', function() {
            // then
            expect(mockService.getFlashcards).toHaveBeenCalledWith('mockFlashcardList');
            expect(mockLocation.path).toHaveBeenCalledWith('/Player/mockFlashcardList/someId1');
        });

        it('should show the rendered text', function() {
            // then
            expect(scope.renderedText).toBe('<p>front 1</p>');
        });
    });

    describe('with flashcard given', function() {
        var testObj,
            deferred,
            scope;

        beforeEach(function() {
            deferred = $q.defer();
            mockService.getFlashcards.andReturn(deferred.promise);
            scope = $rootScope.$new();

            testObj = $controller('PlayerCtrl', {
                $scope: scope,
                $routeParams: {
                    'flashcardListId': 'mockFlashcardList',
                    'flashcardId': 'someId1'
                },
            });

            deferred.resolve(testData);
            $rootScope.$digest();
        });

        it('should remain at given flashcard', function() {
            // then
            expect(mockService.getFlashcards).toHaveBeenCalledWith('mockFlashcardList');
            expect(mockLocation.path).not.toHaveBeenCalled();
        });

        it('should be front at the beginning', function() {
            // then
            expect(scope.isFront).toBe(true);
        });

        it('should change the side upon clicking', function() {
            // when
            scope.toggleFrontBack();

            // then
            expect(scope.isFront).toBe(false);
        });

        it('should return side upon clicking twice', function() {
            // when
            scope.toggleFrontBack();
            scope.toggleFrontBack();

            // then
            expect(scope.isFront).toBe(true);
        });

        it('should switch the rendered text upon toggling', function() {
            // when
            scope.toggleFrontBack();

            // then
            expect(scope.renderedText).toMatch(testData[0].back);
        });

    });
});