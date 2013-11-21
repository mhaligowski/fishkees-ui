'use strict';

angular
    .module('flashcardModule.directives')
    .directive('markdownEditor', function() {
        var converter = new Showdown.converter();

        return {
            restrict: 'E',
            scope: {
                text: '=text',
                placeholderText: '@placeholderText',
                update: '&updateFn',
                isEditMode: '=?editMode'
            },
            templateUrl: 'views/markdownEditorTemplate.html',
            compile: function(tElement, tAttrs) {
                return function(scope, iElement, iAttrs, controller) {
                    var updateMarkdown = function(text) {
                        if (scope.text && scope.text != '') {
                            var htmlText = converter.makeHtml(scope.text);
                            iElement.find('div').html(htmlText);
                        } else {
                            iElement.find('div').html(scope.placeholderText);
                        }
                    };

                    updateMarkdown(scope.text);

                    scope.isEditMode = 
                        typeof scope.isEditMode !== 'undefined'
                            && scope.isEditMode != '';

                    scope.toEditMode = function() {
                        iElement.find('textarea').html(scope.text);
                        scope.isEditMode = true;
                    };

                    scope.cancel = function() {
                        scope.isEditMode = false;
                    };

                    scope.ok = function() {
                        scope.text = iElement.find('textarea').val();
                        scope.update({newValue: scope.text});
                        updateMarkdown(scope.text);

                        scope.isEditMode = false;
                    };

                    scope.getEditMode = function() {
                        return scope.isEditMode;
                    };
                }
            }
        };
    });