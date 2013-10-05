angular.module('commonModule.services')
    .factory('FishkeesResource', function($http) {
        return function(url) {
            var resourceUrl = url;

            var Resource = function (data) {
                angular.extend(this, data);
            };

            Resource.query = function(params) {
                return $http.get(resourceUrl, {
                    params: angular.extend({q: JSON.stringify({} || params)}, {})
                })

                .then(function(response) {
                    var result = [];

                    angular.forEach(response.data, function(value, key) {
                        result[key] = new Resource(value);
                    });

                    return result;
                });
            };

            return Resource;
        };
    });