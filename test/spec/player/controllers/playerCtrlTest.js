'use strict'


describe('PlayerCtrl', function() {
    var testData = [
        {
            id: "someId1",
            flashcard_list_id: "mockFlashcardList",
            front: "front 1",
            back: "back 1",
            create_date: 520603200000
        },
        {
            id: "someId3",
            flashcard_list_id: "mockFlashcardList",
            front: "front 3",
            back: "back 3",
            create_date: 520603200000
    }];

    var $controller,
        $rootScope,
        $q,
        mockRoute,
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
        mockRoute = jasmine.createSpy('mockRoute');
        mockSanitize = jasmine.createSpyObj('$sce', [ 'trustAsHtml' ]);
        mockSanitize.trustAsHtml.andCallFake(function(p) { return p; });

        module(function ($provide) {
            $provide.value('flashcardListDetailsService', mockService);
            $provide.value('$location', mockLocation);
            $provide.value('$sce', mockSanitize);
            $provide.value('$route', mockRoute);
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

        it('should set the isEmpty flag to false', function() {
            // then
            expect(scope.isEmpty).toBeFalsy();
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
                    'flashcardListId': testData[0].flashcard_list_id,
                    'flashcardId': testData[0].id
                },
            });

            deferred.resolve(testData);
            $rootScope.$digest();
        });

        it('should remain at given flashcard', function() {
            // then
            expect(mockService.getFlashcards).toHaveBeenCalledWith('mockFlashcardList');
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

        it('should change the address upon clicking next', function() {
            // when
            scope.goToNextFlashcard();

            // then
            expect(mockLocation.path).toHaveBeenCalledWith('/Player/mockFlashcardList/someId3');
        });

        it('should have the flashcard update upon clicking next', function() {
            // when
            scope.goToNextFlashcard();

            // then
            expect(scope.renderedText).toMatch(testData[1].front);
        });

        it('should change to front upon clicking next', function() {
            // given
            scope.isFront = false;

            // when
            scope.goToNextFlashcard();

            // then
            expect(scope.isFront).toBe(true);
        });

        it('should cycle when clicking next', function() {
            // when
            scope.goToNextFlashcard();
            scope.goToNextFlashcard();

            // then
            expect(scope.renderedText).toMatch(testData[0].front);
        });

    });

    describe('with second flashcard given', function() {
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
                    'flashcardListId': testData[1].flashcard_list_id,
                    'flashcardId': testData[1].id
                },
            });

            deferred.resolve(testData);
            $rootScope.$digest();
        });

        it('should change the url to the previous flashcard after clicking previous button', function() {
            // when
            scope.goToPreviousFlashcard();

            // then
            expect(mockLocation.path).toHaveBeenCalledWith('/Player/mockFlashcardList/someId1');            
        });

        it('should show the front of the previous flashcard', function() {
            // when
            scope.goToPreviousFlashcard();

            // then
            expect(scope.renderedText).toMatch(testData[0].front);
        });

        it('should display the front of the previous flashcard if earlier was back', function() {
            // given
            scope.isFront = false;

            // when
            scope.goToPreviousFlashcard();

            // then
            expect(scope.isFront).toBeTruthy();
            expect(scope.renderedText).toMatch(testData[0].front);
        });

    });

    describe('with empty flashcard set', function() {
        var testObj,
            scope,
            deferred;

        beforeEach(function() {
            deferred = $q.defer();
            mockService.getFlashcards.andReturn(deferred.promise);
            scope = $rootScope.$new();

            testObj = $controller('PlayerCtrl', {
                $scope: scope,
                $routeParams: { 'flashcardListId': 'emptyList' },
            });

            deferred.resolve([]);
            $rootScope.$digest();
        });

        it('should have isEmpty flag set to true', function() {
            expect(scope.isEmpty).toBeTruthy();
        });
    });
});