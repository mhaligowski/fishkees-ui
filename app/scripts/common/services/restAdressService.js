angular.module('commonModule.services')
    .service('RestAdressService', function(REST_PREFIX) {
        this.getAddress = function(path) {
            return REST_PREFIX + path;
        };
    })