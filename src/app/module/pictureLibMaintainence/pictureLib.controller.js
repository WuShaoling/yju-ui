(function() {
    'use strict';

    angular
        .module('phoenix')
        .controller('pictureLibCtrl', pictureLibCtrl);

    pictureLibCtrl.$inject = ['$scope', '$timeout', '$uibModalInstance', 'photoswipeSrv', 'courseManagementSrv', '$stateParams', 'reqUrl', '$state'];

    function pictureLibCtrl($scope, $timeout, $uibModalInstance, photoswipeSrv, courseManagementSrv, $stateParams, reqUrl, $state) {
        $timeout(function() {
            photoswipeSrv.initPhotoSwipeFromDOM('.my-gallery');

        })

        courseManagementSrv.getModuleLib().get({ moduleId: $stateParams.moduleId })
            .$promise.then(
                function(response) {
                    console.log(response);
                    if (response.errorCode == 0) {
                        $scope.pics = response.data.imageList;
                    }
                },
                function(error) {
                    console.log(error)
                }
            )
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
            // var url = $scope.getObjectURL(file);
            var formdata = new FormData();
            formdata.append('file', file);
            $.ajax({
                type: 'POST',
                url: reqUrl + '/admin/course/experiment/piclib',
                dataType: 'json',
                beforeSend: function(xhr) {
                    // xhr.setRequestHeader('access_token', '1504751421487');
                    xhr.setRequestHeader('Authorization', 'Bearer ' + (localStorage['token'] ? localStorage['token'] : ''));
                },
                processData: false, // Dont process the files
                contentType: false,
                data: formdata,
                success: function(res) {
                    console.log(res)
                    if (res.errorCode == 0) {
                        // toastr.success('上传成功');
                        $scope.picInfo = res.data;
                        console.log($scope.picInfo);
                        courseManagementSrv.addModuleLib().save({
                            height: $scope.picInfo.height,
                            imageUrl: $scope.picInfo.url,
                            moduleId: $stateParams.moduleId,
                            name: $scope.picInfo.name,
                            width: $scope.picInfo.width
                        }).$promise.then(
                            function(response) {
                                if (response.errorCode == 0) {
                                    toastr.success("上传成功")
                                    $scope.pics.push({
                                        height: $scope.picInfo.height,
                                        imageUrl: $scope.picInfo.url,
                                        name: $scope.picInfo.name,
                                        width: $scope.picInfo.width,
                                        resourceId: response.data
                                    });

                                } else {
                                    toastr.error(response.message)
                                }
                            },
                            function(error) {
                                toastr.error("上传失败，请稍后再试")
                            })
                        $scope.$apply();
                    } else if (res.errorCode == 45) {
                        toastr.warning("登录超时！");
                        localStorage['requireLogin'] = true
                        $state.go("index.main", null, { reload: true })
                    } else if (res.errorCode == 46) {
                        toastr.warning("请重新登录！");
                        localStorage['requireLogin'] = true
                        $state.go("index.main", null, { reload: true })
                    } else {
                        toastr.error(res.message);
                    }
                }
            });
            // $scope.pics.push({ des: "new" + new Date().getTime(), url: url });
            $scope.$apply();
        };
        $scope.choosePic = function() {
            $('#picFile').trigger('click');
        }
        $scope.deletePic = function(index, item) {
            courseManagementSrv.deleteLibPic().save({
                "moduleId": $stateParams.moduleId,
                "resourceId": item.resourceId
            }).$promise.then(function(response) {
                console.log(response);
                if (response.errorCode == 0) {
                    toastr.success("删除成功");
                    $scope.pics.splice(index, 1);

                } else {
                    toastr.error(response.message)
                }
            }, function(error) {
                console.log(error);
            })
        }
        $scope.pics = [];
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
})();