'use strict'

describe('FlashcardListDetailsService', function() {
    var testList = {
        "id": "someNiceId1",
        "title": "Spanish for beginners",
        "create_date": 1379617022000
    };

    var $httpBackend,
        testObj;

    beforeEach(function() {
        module('flashcardModule.services');

        inject(function (_$httpBackend_, $injector) {
            $httpBackend = _$httpBackend_;
            testObj = $injector.get('flashcardListDetailsService');
        });
    });

    it('should return a list', function() {
        // given
        $httpBackend
            .expectGET('/service/flashcardlists/12345')
            .respond(testList);

        // when
        var actual = testObj.getListDetails(12345);
        $httpBackend.flush();

        // then
        expect(actual.title).toEqual(testList.title);

    });
});