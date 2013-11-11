angular.module('commonModule.constants', []);
angular.module('commonModule.services', ['commonModule.constants']);
angular.module('commonModule.controllers', []);

angular.module('commonModule', ['commonModule.services', 'commonModule.controllers']);
