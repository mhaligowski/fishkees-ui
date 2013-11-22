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
                    var buildWarning = function(text) {
                        return angular
                            .element('<p class="text-warning"></p>')
                            .text(text)[0].outerHTML;
                    }

                    var updateMarkdown = function(text) {
                        var htmlText = scope.text 
                            ? converter.makeHtml(scope.text)
                            : buildWarning(scope.placeholderText || '');

                        iElement
                            .find('div')
                            .html(htmlText);
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