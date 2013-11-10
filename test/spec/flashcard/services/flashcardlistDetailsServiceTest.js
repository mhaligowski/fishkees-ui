'use strict'

describe('FlashcardListDetailsService', function() {
    var testList = {
        "id": "someNiceId1",
        "title": "Spanish for beginners",
        "create_date": 1379617022000
    };

    var testFlashcards = [
        {
            id: "someId1",
            flashcard_list_id: "someNiceId1",
            front: "front 1",
            back: "back 1",
            create_date: 520603200000
        },
        {
            id: "someId2",
            flashcard_list_id: "someNiceId1",
            front: "front 2",
            back: "back 2",
            create_date: 520603200000
        },
        {
            id: "someId3",
            flashcard_list_id: "someNiceId1",
            front: "front 3",
            back: "back 3",
            create_date: 520603200000
        }];

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

    it('should return a list of flashcards', function() {
        // given
        $httpBackend
            .expectGET('/service/flashcardlists/12345/flashcards')
            .respond(testFlashcards);

        // when
        var actual = testObj.getFlashcards(12345);
        $httpBackend.flush();

        // then
        expect(actual.length).toEqual(3);
    });
});