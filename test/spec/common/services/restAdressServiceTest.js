'use strict'

describe('Service: RestAdressService', function() {
    beforeEach(function() {
        module('commonModule.services');

        module(function($provide) {
            $provide.constant('REST_PREFIX', 'abcd');
        });
    });

    var restAddressService;


    beforeEach(inject(function($injector) {
        restAddressService = $injector.get('RestAdressService');
    }));

    it('should return prefixed address', function() {
        expect(restAddressService.getAddress('/path')).toMatch('abcd/path');
    });

});