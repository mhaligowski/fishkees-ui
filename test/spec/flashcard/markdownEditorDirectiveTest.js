'use strict'

describe('MarkdownEditorDirective', function() {
    
    var $compile, $scope;

    var template = "<markdown-editor text='testText'></markdown-editor>";

    beforeEach(function() {
        module('flashcardModule.directives');

        inject(function (_$compile_, $rootScope) {
            $compile = _$compile_;
            $scope = $rootScope.$new();
        });
    });

    it('should be empty if there is no text', function() {
        // given
        $scope.testText = '';

        // when
        var element = $compile(template)($scope);
        $scope.$digest();

        // then
        expect(element.text()).toBe("");
    });

    it('should compile to markdown', function() {
        // given
        $scope.testText = '**hello**';

        // when
        var element = $compile(template)($scope);
        $scope.$digest();

        // then
        expect(element.html()).toContain("<strong>hello</strong>");

    });


});
