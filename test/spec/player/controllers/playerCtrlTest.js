'use strict'


ddescribe('PlayerCtrl', function() {
    var $controller,
        $rootScope,
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

        module(function ($provide) {
            $provide.value('flashcardListDetailsService', mockService);
        });

        inject(function (_$controller_, _$rootScope_) {
            $controller = _$controller_;
            $rootScope = _$rootScope_;
        });

    });

    describe('with no flashcard given', function() {
        var testObj;

        beforeEach(function() {
            testObj = $controller('PlayerCtrl', {
                $scope: $rootScope.$new(),
                $routeParams: { 'flashcardListId': 'mockFlashcardList' }
            });
        });

        it('should not blow out', function() {
            expect(1).toBe(1);
        });
    });
});