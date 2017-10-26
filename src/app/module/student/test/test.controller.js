(function() {
    'use strict';

    angular
        .module('phoenix')
        .controller('testCtrl', testCtrl);

    testCtrl.$inject = ['$scope', '$timeout'];

    function testCtrl($scope, $timeout) {
        $('.summernote').summernote({
            height: 600,
            focus: true,

            toolbar: [
                ['edit', ['undo', 'redo']],
                ['headline', ['style']],
                ['style', ['bold', 'italic', 'underline', 'superscript', 'subscript', 'strikethrough', 'clear']],
                ['fontface', ['fontname']],
                ['textsize', ['fontsize']],
                ['fontclr', ['color']],
                ['alignment', ['ul', 'ol', 'paragraph', 'lineheight']],
                ['height', ['height']],
                ['table', ['table']],
                ['insert', ['link', 'picture', 'video', 'hr']],
                ['view', ['fullscreen', 'codeview']],
                ['help', ['help']]
            ]
        });
        $scope.show3 = false;
        $scope.show1 = true;
        $scope.show2 = false;

        $scope.show = function(value) {
            switch (value) {
                case 1:
                    $scope.show1 = true;
                    $scope.show2 = false;
                    $scope.show3 = false

                    var testEditor = editormd("test-editormd", {
                        path: 'markdownLib/',
                        height: 600,
                        onchange: function() {
                            console.log(this.getValue());
                        },
                        imageUpload: true,
                        imageFormats: ["jpg", "jpeg", "gif", "png", "bmp", "webp"],
                        imageUploadURL: 'http://www.x-lab.ac:13001/admin/course/experiment/piclib',
                    });
                    break;
                case 2:
                    $scope.show2 = true;

                    $scope.show1 = false;
                    $scope.show3 = false;
                    break;
                case 3:
                    $scope.show3 = true;
                    $scope.show1 = false;
                    $scope.show2 = false;

                    break;

                default:
                    break;
            }
        }
        $scope.test = function() {
            console.log($scope.text)
        }
        $scope.show(1);
        var converter = new showdown.Converter();
        converter.setOption('tasklists', true);
        converter.setOption('tables', true);
        $.get("app/module/teacher/teacherCourse/test.md", function(result) {
            // console.log(result)
            if (result == null) {
                return
            }
            $scope.text = result;
            console.log($scope.text);
            $scope.html = converter.makeHtml($scope.text);
            $timeout(function() {
                console.log($('#ht').height())
                $('#or').height($('#ht').height());
            })

            // console.log(result.label_type)

        });
        $scope.change = function() {
            console.log($scope.text);
            $scope.html = converter.makeHtml($scope.text);

        }
        $("textarea").on(
            'keydown',
            function(e) {
                $scope.change();
                if (e.keyCode == 9) {
                    e.preventDefault();
                    var indent = '    ';
                    var start = this.selectionStart;
                    var end = this.selectionEnd;
                    var selected = window.getSelection().toString();
                    selected = indent + selected.replace(/\n/g, '\n' + indent);
                    this.value = this.value.substring(0, start) + selected +
                        this.value.substring(end);
                    this.setSelectionRange(start + indent.length, start +
                        selected.length);
                }
            })



    }
})();