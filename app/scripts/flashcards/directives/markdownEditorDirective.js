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
            compile: function compile(tElement, attrs, transclude) {
                return function(scope, element, attrs) {
                    scope.isEditMode = false;

                    if (scope.text) {
                        var htmlText = converter.makeHtml(scope.text);
                        element.html(htmlText);
                    }
                }
            }
        }
    });