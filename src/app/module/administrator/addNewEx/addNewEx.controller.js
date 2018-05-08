(function() {
    'use strict';

    angular
        .module('phoenix')
        .controller('addNewExCtrl', addNewExCtrl);

    addNewExCtrl.$inject = ['$scope', '$timeout', '$uibModal', 'commonSrv', 'courseManagementSrv', '$stateParams', 'reqUrl', '$state'];

    function addNewExCtrl($scope, $timeout, $uibModal, commonSrv, courseManagementSrv, $stateParams, reqUrl, $state) {
        $scope.experiment = {};
        $scope.text = "";
        $scope.disableSave = false;
        $scope.loadEx = function () {
            if($stateParams.experimentId != 0) {
                $scope.disableSave = true;
                commonSrv.getExperimentDetail().get({
                        experimentId: $stateParams.experimentId
                    }, function(response) {
                        console.log(response);
                        if (response.errorCode == 0) {
                            $scope.experiment = response.data
                            $scope.text = response.data.experimentContent
                            $scope.disableSave = false
                        } else {
                            toastr.error(response.message)
                        }
                    },
                    function(error) {
                        toastr.error("获取实验详情失败，请稍后再试")
                    })
            }
        }()

        $scope.ok = function() {
            if (!$scope.experiment.experimentName) {
                toastr.error("实验名称不能为空");
                return;
            }
            if (!$scope.experiment.imageTypeId) {
                toastr.error("实验类型不能为空");
                return;
            }
            if (!$scope.experiment.imageNameVersion) {
                toastr.error("实验镜像名字不能为空");
                return;
            }


            console.log($scope.text);
            if($stateParams.experimentId == 0) {
                courseManagementSrv.addExperiment().save({
                    "imageType": $scope.experiment.imageTypeId,
                    "imageNameVersion": $scope.experiment.imageNameVersion,
                    "experimentContent": $scope.text,
                    "experimentDes": $scope.experiment.experimentDes,
                    "experimentCreateDate": new Date(),
                    // "experimentDueDate": "2017-10-24T07:10:27.269Z",
                    "experimentName": $scope.experiment.experimentName,
                    // "experimentUrl": "string",
                    "moduleId": $stateParams.moduleId
                }).$promise.then(
                    function (response) {
                        console.log(response)
                        if (response.errorCode == 0) {
                            toastr.success("添加成功")
                            $state.go('index.courseMaintainence', {courseId: $stateParams.courseId});

                        } else {
                            toastr.error(response.message);
                        }
                    },
                    function (error) {
                        toastr.error("添加失败，请稍后再试");
                    }
                )
            } else {
                courseManagementSrv.updateExperiment().save({
                    "id": $scope.experiment.id,
                    "imageType": $scope.experiment.imageTypeId,
                    "imageNameVersion": $scope.experiment.imageNameVersion,
                    "experimentContent": $scope.text,
                    "experimentDes": $scope.experiment.experimentDes,
                    "experimentName": $scope.experiment.experimentName,
                    "moduleId": $stateParams.moduleId
                }).$promise.then(
                    function (response) {
                        console.log(response)
                        if (response.errorCode == 0) {
                            toastr.success("更新成功")
                            $state.go('index.courseMaintainence', {courseId: $stateParams.courseId});

                        } else {
                            toastr.error(response.message);
                        }
                    },
                    function (error) {
                        toastr.error("更新失败，请稍后再试");
                    }
                )
            }
        }
        $scope.imageTypes = [{
            label: "cloudware",
            value: 1,
        }, {
            label: "notebook",
            value: 2,
        }, {
            label: "webide",
            value: 3,
        }];
        $scope.$on("$destroy", function() {

            $('.menuFooter').show()

            $('.footer').css({ 'position': '', 'bottom': "none" })

        })

        $scope.chooseMarkdown = function() {
            $('#markdownFile').trigger('click');

        }

        $scope.getFile = function(file) {
            var formdata = new FormData();
            formdata.append('file', file);
            $.ajax({
                type: 'POST',
                url: reqUrl + '/admin/course/experiment/markdown',
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
                        toastr.success('上传成功');
                        $scope.markdownUrl = res.data;
                        $.get($scope.markdownUrl + '', function(result) {
                            console.log(result)
                            if (result == null) {
                                return
                            }
                            $scope.text = result;
                            console.log($scope.text);

                            $scope.html = converter.makeHtml($scope.text);
                            // $timeout(function() {
                            //     console.log($('#ht').height())
                            //     $('#or').height($('#ht').height());
                            // })

                            // console.log(result.label_type)

                        });
                        // qiniuImage = qiniuURL + res.fileName;
                        // $scope.imageSrc = qiniuURL + res.fileName;
                        // $scope.isUpload = true;
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

        };

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
                            path: 'markdownLib/',
                            height: 600,
                            emoji: true,
                            onchange: function() {
                                // console.log(this.getValue());
                                $scope.text = this.getValue();
                                $scope.$apply();
                                console.log($scope.text);
                            },
                            // imageUpload: true,
                            // imageFormats: ["jpg", "jpeg", "gif", "png", "bmp", "webp"],
                            // imageUploadURL: 'http://www.x-lab.ac:13001/admin/course/experiment/piclib',
                        });
                    })
                    $('.footer').css({ 'position': '', 'bottom': "none" })

                    $scope.showPicLibBtn = true;

                    break;

                default:
                    break;
            }
        };


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

        activate();

        ////////////////

        function activate() {}
    }
})();