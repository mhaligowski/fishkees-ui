'use strict'

describe('MarkdownEditorDirective', function() {
    
    var $compile, $scope, $httpBackend;

    var template = "<markdown-editor \
                        text='testText' \
                        edit-mode='editMode' \
                        update-fn='mockFunction()'> \
                    </markdown-editor>";

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

    it('should go to editor mode on upon clicking "Cancel"', function() {
        // when
        var element = $compile(template)($scope);
        $httpBackend.flush();
        $scope.$$childTail.toEditMode();

        // then
        expect($scope.$$childTail.isEditMode).toBe(true);
    });

    it('should switch to preview mode after clicking "Cancel" button', function() {
        // given
        $scope.editMode = true;

        // when
        var element = $compile(template)($scope);
        $httpBackend.flush();
        $scope.$$childTail.cancel();

        // then
        expect($scope.$$childTail.isEditMode).toBe(false);
    });

    it('should switch to preview mode after clicking "OK" button', function() {
        // given
        $scope.editMode = true;

        // when
        var element = $compile(template)($scope);
        $httpBackend.flush();
        $scope.$$childTail.ok();

        // then
        expect($scope.$$childTail.isEditMode).toBe(false);
    });

    it('should change the value after clicking "OK" button', function() {
        // given
        $scope.editMode = true;

        // when
        var element = $compile(template)($scope);
        $httpBackend.flush();
        element.find('textarea').val("*hello*");
        $scope.$$childTail.ok();

        // then
        expect(element.html()).toContain("<em>hello</em>");
    });

    it('should call the update function after clicking "OK"', function() {
        // given
        $scope.editMode = true;
        $scope.mockFunction = jasmine.createSpy("mockFunction");

        // when
        var element = $compile(template)($scope);
        $httpBackend.flush();
        element.find('textarea').val("*hello*");
        $scope.$$childTail.ok();

        // then
        expect($scope.mockFunction).toHaveBeenCalled();
    });
});