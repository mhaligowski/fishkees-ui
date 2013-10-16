describe("Module: FlashcardList module", function() {
    
    var route, location, rootScope, httpBackend;

    beforeEach(module('flashcardListsModule'));

    beforeEach(inject(function ($route, $location, $rootScope, $httpBackend) {
        route = $route;
        location = $location;
        rootScope = $rootScope;
        httpBackend = $httpBackend;
    }));

    it("should handle /FlashcardLists properly", function() {
        // given
        httpBackend.expectGET('views/FlashcardList.html').respond(200);

        expect(route.current).toBeUndefined();
        
        // when
        location.path("/FlashcardLists");
        rootScope.$digest();
        httpBackend.flush();

        // then
        expect(route.current.templateUrl).toBe('views/FlashcardList.html');
        expect(route.current.controller).toBeUndefined();

    }); 
});