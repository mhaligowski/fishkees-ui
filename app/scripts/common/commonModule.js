angular.module('commonModule.constants', []);
angular.module('commonModule.services', ['commonModule.constants']);

angular.module('commonModule', ['commonModule.services']);
