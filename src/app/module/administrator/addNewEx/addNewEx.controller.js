(function() {
    'use strict';

    angular
        .module('phoenix')
        .controller('addNewExCtrl', addNewExCtrl)
        .controller('pictureLibCtrl', pictureLibCtrl);

    pictureLibCtrl.$inject = ['$scope', '$timeout', '$uibModalInstance', 'photoswipeSrv'];



    function pictureLibCtrl($scope, $timeout, $uibModalInstance, photoswipeSrv) {
        $timeout(function() {
            photoswipeSrv.initPhotoSwipeFromDOM('.my-gallery');

        })
        $scope.getObjectURL = function(file) {
            var url = null;
            if (window.createObjectURL != undefined) { // basic
                url = window.createObjectURL(file);
            } else if (window.URL != undefined) { // mozilla(firefox)
                url = window.URL.createObjectURL(file);
            } else if (window.webkitURL != undefined) { // webkit or chrome
                url = window.webkitURL.createObjectURL(file);
            }
            return url;
        }
        $scope.getFile = function(file) {
            var url = $scope.getObjectURL(file);
            $scope.pics.push({ des: "new" + new Date().getTime(), url: url });
            $scope.$apply();
        };
        $scope.choosePic = function() {
            $('#picFile').trigger('click');
        }
        $scope.deletePic = function(index) {
            $scope.pics.splice(index, 1);
        }
        $scope.pics = [{
            des: "description",
            url: "https://picture.insight365.ai/logo.jpeg"
        }, {
            des: "description",
            url: "https://picture.insight365.ai/logo.jpeg"
        }, {
            des: "description",
            url: "https://picture.insight365.ai/logo.jpeg"
        }]
        $scope.supported = false;

        // $scope.textToCopy = 'I can copy by clicking!';

        $scope.success = function(item) {
            toastr.success('Copied!');
            console.log(item);
        };

        $scope.fail = function(err) {
            toastr.error('Error!', err);
        };
        $scope.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        }
        $scope.ok = function() {

            $uibModalInstance.close();
        }
    }
    addNewExCtrl.$inject = ['$scope', '$timeout', '$uibModal'];



    function addNewExCtrl($scope, $timeout, $uibModal) {



        $timeout(function() {
            $('.menuFooter').hide()
            $('.footer').css({ 'position': 'fixed', 'bottom': 0 })
        })
        $scope.showPicLib = function() {
            toastr.success("show..");
            var modalInstance = $uibModal.open({
                keyboard: false,
                size: 'lg',
                templateUrl: 'app/module/modal/pictureLibModal.html',
                controller: 'pictureLibCtrl'
            });


            modalInstance.result.then(function(result) {
                console.log(result);
                $scope.courseDetail.push(result)

            });
        }
        var converter = new showdown.Converter();
        $scope.change = function(tab) {
            switch (tab) {
                case 0:
                    $scope.showPicLibBtn = false;
                    $('.footer').css({ 'position': 'fixed', 'bottom': 0 })

                    break;
                case 1:
                    $timeout(function() {
                        var testEditor = editormd("test-editormd", {
                            path: 'lib/',
                            height: 600,
                            emoji: true
                        });
                    })
                    $('.footer').css({ 'position': '', 'bottom': "none" })

                    $scope.showPicLibBtn = true;

                    break;

                default:
                    break;
            }
        };


        $.get("app/module/teacher/teacherCourse/test.md", function(result) {
            // console.log(result)
            if (result == null) {
                return
            }
            $scope.text = result;
            $scope.html = converter.makeHtml($scope.text);
            // $timeout(function() {
            //     console.log($('#ht').height())
            //     $('#or').height($('#ht').height());
            // })

            // console.log(result.label_type)

        });

        activate();

        ////////////////

        function activate() {}
    }
})();