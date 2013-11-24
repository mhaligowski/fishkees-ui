'use strict';

describe('FlashcardPlayerModule', function() {
    var route, location, rootScope, httpBackend;

    beforeEach(module('flashcardPlayerModule'));

    beforeEach(inject(function ($route, $location, $rootScope, $httpBackend) {
        route = $route;
        location = $location;
        rootScope = $rootScope;
        httpBackend = $httpBackend;
    }));

    it("should handle /Player properly", function() {
        // given
        httpBackend.expectGET('views/player.html').respond(200);

        expect(route.current).toBeUndefined();
        
        // when
        location.path("/Player/12345/abcd");
        rootScope.$digest();
        httpBackend.flush();

        // then
        expect(route.current.templateUrl).toBe('views/player.html');
        expect(route.current.controller).toBeUndefined();

    });     
});