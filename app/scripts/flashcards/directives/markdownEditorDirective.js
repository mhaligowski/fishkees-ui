'use strict';

angular
    .module('flashcardModule.directives')
    .directive('markdownEditor', function() {
        return {
            restrict: "E",
            scope: {
                text: '=text'
            },
            template: "<span>{{ text }}</span>"
        }
    });