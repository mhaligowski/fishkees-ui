'use strict';

angular
    .module('flashcardModule.directives')
    .directive('markdownEditor', function() {
        var converter = new Showdown.converter();
        return {
            restrict: "E",
            scope: {
                text: '=text'
            },
            compile: function(tElement, tAttrs, transclude) {
                return function(scope, iElement, iAttrs, controller) {
                    if (scope.text) {
                        var htmlText = converter.makeHtml(scope.text);
                        iElement.html(htmlText);
                    }
                }
            }
        };
    });