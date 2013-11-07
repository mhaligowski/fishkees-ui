'use strict'

angular.scenario.dsl('restartDB', function() {
    return function() {
        return this.addFutureAction('restartDB', function($window, $document, done) {
            var $ = $window.$;
            $.post('/admin/tasks/resetStorage');
            return done();
        });
    };
});
