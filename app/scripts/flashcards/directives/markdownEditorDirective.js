'use strict';

angular
    .module('flashcardModule.directives')
    .directive('markdownEditor', function() {
        var converter = new Showdown.converter();

        return {
            restrict: 'E',
            scope: {
                text: '=text'
            },
            template: '<div ng-hide="isEditMode" ng-dblclick="toEditMode()" class="preview"></div><textarea ng-show="isEditMode" class="editor input-block-level"></textarea>',
            compile: function(tElement, tAttrs, transclude) {
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