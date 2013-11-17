'use strict'

describe('MarkdownEditorDirective', function() {
    
    var $compile, $scope, $httpBackend;

    var template = "<markdown-editor text='testText' edit-mode='editMode'></markdown-editor>";

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

        // then
        expect(element.html()).toContain("<strong>hello</strong>");
    });

    it('should have editor mode off by default', function() {
        // when
        var element = $compile(template)($scope);
        $httpBackend.flush();

        // then
        expect($scope.$$childTail.isEditMode).toBe(false);
    });

    it('should be able to initialize with editor mode', function() {
        // given
        $scope.editMode = true;

        // when
        var element = $compile(template)($scope);
        $httpBackend.flush();

        // then
        expect($scope.$$childTail.isEditMode).toBe(true);
    });

    it("should haved editor mode on upon clicking", function() {
        // when
        var element = $compile(template)($scope);
        $httpBackend.flush();
        $scope.$$childTail.toEditMode();

        // then
        expect($scope.$$childTail.isEditMode).toBe(true);
    });

    it('should switch to preview mode after clicking "Close" button', function() {
        // given
        $scope.editMode = true;

        // when
        var element = $compile(template)($scope);
        $httpBackend.flush();
        $scope.$$childTail.cancel();

        // then
        expect($scope.$$childTail.isEditMode).toBe(false);
    });

});