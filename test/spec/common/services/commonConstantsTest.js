'use strict'

describe('Module: CommonConstants', function() {
    beforeEach(module('commonModule.constants'));

    var restPrefixValue;

    beforeEach(inject(function(REST_PREFIX) {
        restPrefixValue = REST_PREFIX;
    }));

    it('should be /service/', function() {
        expect(restPrefixValue).toMatch('/service/');
    })
});