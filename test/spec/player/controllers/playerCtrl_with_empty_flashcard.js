'use strict'


describe('PlayerCtrl', function() {
    var testData = [
        {
            id: "someId1",
            flashcard_list_id: "mockFlashcardList",
            front: null,
            back: "",
            create_date: 520603200000
        }
    ];

    var $controller,
        $rootScope,
        $q,
        mockRoute,
        mockLocation,
        mockService,
        mockSanitize,
        testObj,
        scope,     
        deferred;

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

    it('should display a message when there is no content in the flashcard', function() {
        // then
        expect(scope.renderedText).not.toBeNull();
    });

});