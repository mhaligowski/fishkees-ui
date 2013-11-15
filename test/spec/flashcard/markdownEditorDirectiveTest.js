'use strict'

describe('MarkdownEditorDirective', function() {
    
    var $compile, $scope, $httpBackend;

    var template = "<markdown-editor text='testText'></markdown-editor>";

    beforeEach(function() {
        module('flashcardModule.directives');

        inject(function (_$compile_, $rootScope, _$httpBackend_) {
            $compile = _$compile_;
            $scope = $rootScope.$new();
            $httpBackend = _$httpBackend_;

            $httpBackend
                .when('GET', "views/markdownEditorTemplate.html")
                .respond('<div ng-hide="isEditMode" ng-dblclick="toEditMode()" class="preview"> \
                        </div> \
                        <textarea ng-show="isEditMode" class="editor input-block-level"> \
                        </textarea>');

        });
    });

    it('should compile to markdown', function() {
        // given
        $scope.testText = '**hello**';

        // when
        var element = $compile(template)($scope);
        $httpBackend.flush();
        $scope.$digest();

        // then
        expect(element.html()).toContain("<strong>hello</strong>");

    });

    it('should have editor mode off by default', function() {
        // when
        var element = $compile(template)($scope);
        $httpBackend.flush();

        // then
        expect(element.scope().isEditMode).toBe(false);
    });

    it("should haved editor mode on upon clicking", function() {
        // when
        var element = $compile(template)($scope);
        $httpBackend.flush();
        element.scope().toEditMode();

        // then
        expect(element.scope().isEditMode).toBe(true);
    });
});