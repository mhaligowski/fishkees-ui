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

    it('should remove flashcard from the list', function() {
        // given
        $httpBackend
            .expectDELETE('/service/flashcardlists/someNiceId1/flashcards/someId2')
            .respond(testList[1]);

        // when
        var actual = null; 
        testObj.removeFlashcardFromList(testFlashcards[1], testFlashcards)
               .then(function(r) { actual = r; });
        $httpBackend.flush();

        // then
        expect(actual.length).toEqual(2);
        expect(actual[0]).toEqual(testFlashcards[0]);
        expect(actual[1]).toEqual(testFlashcards[2]);
    });

    it('should update the list', function() {
        // given
        testFlashcards[1].front = "newFront";
        $httpBackend
            .expectPUT('/service/flashcardlists/someNiceId1/flashcards/someId2')
            .respond(testFlashcards[1]);


        // when
        var actual = null;
        testObj.updateFlashcard(testFlashcards[1])
                  .then(function(r) { actual = r; });
        $httpBackend.flush();

        // then
        expect(actual.id).toBe(testFlashcards[1].id);
        expect(actual.front).toBe(testFlashcards[1].front);
        expect(actual.flashcardListId).toBe(testFlashcards[1].flashcardListId);
    });

    it('should return new flashcard list', function() {
        // given
        var newFlashcard = testFlashcards[1];
        $httpBackend
            .expectPOST('/service/flashcardlists/someNiceId1/flashcards')
            .respond(newFlashcard);

        // when
        var actual = null;
        testObj
            .createNewFlashcard("someNiceId1")
            .then(function(r) {
                actual = r;
            });
        $httpBackend.flush();

        // then
        expect(actual.front).toBe(newFlashcard.front);
        expect(actual.back).toBe(newFlashcard.back);
        expect(actual.create_date).toBe(newFlashcard.create_date);
    });
});