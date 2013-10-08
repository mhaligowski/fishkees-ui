'use strict'

describe('Factory: FishkeesResource', function() {
    beforeEach(function() {
        module('commonModule.services');
    });

    var testObj, httpBackend;

    beforeEach(inject(function($httpBackend, FishkeesResource) {
        httpBackend = $httpBackend;
        testObj = FishkeesResource;
    }));

    afterEach(function() {
      httpBackend.verifyNoOutstandingExpectation();
      httpBackend.verifyNoOutstandingRequest();
    });

    it('should return list on query', function() {
        expect(testObj).not.toBeUndefined();
        expect(httpBackend).not.toBeUndefined();

        // given
        var returnedData = [
            { "id": 1, "title": "Spanish for beginners",    "create_date": 1379617022000 },
            { "id": 2, "title": "Russian for intermediate", "create_date": 1339347167000 }
        ]; 

        httpBackend.expect('GET', 'someUrl').respond(returnedData);

        var test = { handler: function() {} };
        spyOn(test, 'handler');

        var testResource = testObj('someUrl');
        var queryPromise = testResource.query();
        queryPromise.then(test.handler);

        // when
        httpBackend.flush();

        // then
        expect(test.handler).toHaveBeenCalledWith(returnedData);
    });

    it('should remove list', function() {
        expect(testObj).not.toBeUndefined();
        expect(httpBackend).not.toBeUndefined();

        // given
        var removedItem = { "id": 1};

        httpBackend.expect('DELETE', 'someUrl/1').respond(200, removedItem);

        var test = { handler: function() {} };
        spyOn(test, 'handler');

        var testResource = testObj('someUrl');
        var deletePromise = testResource.remove({"id": 1});
        deletePromise.then(test.handler);

        // when
        httpBackend.flush();

        // then
        expect(test.handler).toHaveBeenCalledWith(removedItem);
    });
});