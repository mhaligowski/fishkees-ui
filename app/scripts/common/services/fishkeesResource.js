angular.module('commonModule.services')
    .factory('FishkeesResource', function($http) {
        return function(url) {
            var resourceUrl = url;

            var Resource = function (data) {
                angular.extend(this, data);
            };

            Resource.query = function() {
                return $http.get(resourceUrl)

                .then(function(response) {
                    var result = [];

                    angular.forEach(response.data, function(value, key) {
                        result[key] = new Resource(value);
                    });

                    return result;
                });
            };

            Resource.remove = function(object) {
                var deleteUrl = resourceUrl + "/" + object.id;
                return $http.delete(deleteUrl)
                .then(function(response) {
                    return new Resource(response.data);
                });
            };

            return Resource;
        };
    });