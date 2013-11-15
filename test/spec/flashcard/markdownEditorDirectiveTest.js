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

    it('should compile to markdown', function() {
        // given
        $scope.testText = '**hello**';

        // when
        var element = $compile(template)($scope);
        $scope.$digest();

        // then
        expect(element.html()).toContain("<strong>hello</strong>");

    });

    it('should have editor mode off by default', function() {
        // when
        var element = $compile(template)($scope);

        // then
        expect(element.scope().isEditMode).toBe(false);
    });

    it("should haved editor mode on upon clicking", function() {
        // when
        var element = $compile(template)($scope);
        element.scope().toEditMode();

        // then
        expect(element.scope().isEditMode).toBe(true);
    });
});