'use strict';

angular
    .module('flashcardModule.directives')
    .directive('markdownEditor', function() {
        var converter = new Showdown.converter();
        var previewTemplate = '<div ng-hide="isEditMode" ng-dblclick="toEditMode()" class="preview"></div>';
        var editorTemplate = '<textarea ng-show="isEditMode" class="editor input-block-level"></textarea>';

        return {
            restrict: 'E',
            scope: {
                text: '=text'
            },
            compile: function(tElement, tAttrs, transclude) {
                tElement.html(editorTemplate);
                tElement.append(previewTemplate);

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