'use strict';

angular
    .module('flashcardModule.directives')
    .directive('markdownEditor', function() {
        var converter = new Showdown.converter();

        return {
            restrict: 'E',
            scope: {
                text: '=text',
                isEditMode: '&editMode'
            },
            templateUrl: 'views/markdownEditorTemplate.html',
            compile: function(tElement, tAttrs) {
                return function(scope, iElement, iAttrs, controller) {
                    scope.isEditMode = false;

                    if (scope.text) {
                        var htmlText = converter.makeHtml(scope.text);
                        iElement.find('div').html(htmlText);
                    }

                    scope.toEditMode = function() {
                        iElement.find('textarea').html(scope.text);
                        scope.isEditMode = true;
                    }
                }
            }
        };
    });