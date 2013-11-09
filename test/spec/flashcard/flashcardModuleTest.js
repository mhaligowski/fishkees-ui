describe("Module: Flashcard module", function() {
    
    var route, location, rootScope, httpBackend;

    beforeEach(module('flashcardModule'));

    beforeEach(inject(function ($route, $location, $rootScope, $httpBackend) {
        route = $route;
        location = $location;
        rootScope = $rootScope;
        httpBackend = $httpBackend;
    }));

    it("should handle /Flashcard properly", function() {
        // given
        httpBackend.expectGET('views/flashcardListDetails.html').respond(200);

        expect(route.current).toBeUndefined();
        
        // when
        location.path("/FlashcardList/12345");
        rootScope.$digest();
        httpBackend.flush();

        // then
        expect(route.current.templateUrl).toBe('views/flashcardListDetails.html');
        expect(route.current.controller).toBeUndefined();
    }); 
});