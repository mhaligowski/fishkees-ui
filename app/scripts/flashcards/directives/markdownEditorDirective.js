'use strict';

angular
    .module('flashcardModule.directives')
    .directive('markdownEditor', function() {
        return {
            restrict: "E",
            template: "<div>Hello directive</div>"
        }
    });