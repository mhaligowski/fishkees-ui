'use strict';

angular
    .module('flashcardModule.directives')
    .directive('markdownEditor', function() {
        return {
            restrict: "E",
            scope: {
                text: '=text'
            },
            template: "{{ text }}",
            link: function link(scope, element, attrs) {
                console.log(markdown.toHTML(element));
            }
        }
    });