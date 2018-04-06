(function() {
    'use strict';

    angular
        .module('phoenix')
        .controller('addNewHwCtrl', addNewHwCtrl)

    addNewHwCtrl.$inject = ['$scope', '$timeout', '$uibModal', 'stuCourseSrv', 'classManagementSrv', 'courseManagementSrv', '$stateParams', 'reqUrl', '$state'];

    function addNewHwCtrl($scope, $timeout, $uibModal, stuCourseSrv, classManagementSrv, courseManagementSrv, $stateParams, reqUrl, $state) {
        $scope.homework = {};
        $scope.text = "";
        $scope.disableSave = false;
        $scope.loadHw = function () {
            if($stateParams.homeworkId != 0) {
                $scope.disableSave = true;
                stuCourseSrv.getHomeworkDetail().get({
                        homeworkId: $stateParams.homeworkId
                    }, function(response) {
                        console.log(response);
                        if (response.errorCode == 0) {
                            $scope.homework = response.data
                            $scope.text = response.data.homeworkContent
                            $scope.homework.cloudwareType = response.data.cloudwareTypeId
                            $scope.disableSave = false
                        } else {
                            toastr.error(response.message)
                        }
                    },
                    function(error) {
                        toastr.error("获取作业详情失败，请稍后再试")
                    })
            }
        }()

        $scope.ok = function() {
            if (!$scope.homework.homeworkName) {
                toastr.error("作业名称不能为空");
                return;
            }
            if (!$scope.homework.cloudwareType) {
                toastr.error("容器类型不能为空");
                return;
            }


            console.log($scope.text);
            if($stateParams.homeworkId == 0) {
                classManagementSrv.addHomework().save({
                    "classId": $stateParams.classId,
                    "cloudwareType": $scope.homework.cloudwareType,
                    "homeworkCreateDate": new Date(),
                    "homeworkDes": $scope.homework.homeworkDes,
                    "homeworkDueDate": $scope.homework.dueDate,
                    "homeworkName": $scope.homework.homeworkName,
                    "homeworkContent": $scope.text,
                    "moduleId": $stateParams.moduleId
                }).$promise.then(
                    function (response) {
                        console.log(response)
                        if (response.errorCode == 0) {
                            toastr.success("添加成功")
                            $state.go('index.homeworkManagement', {classId: $stateParams.classId});

                        } else {
                            toastr.error(response.message);
                        }
                    },
                    function (error) {
                        toastr.error("添加失败，请稍后再试");
                    }
                )
            } else {
                classManagementSrv.updateHomework().save({
                    "cloudwareType": $scope.homework.cloudwareType,
                    "homeworkDes": $scope.homework.homeworkDes,
                    "homeworkDueDate": $scope.homework.dueDate,
                    "homeworkName": $scope.homework.homeworkName,
                    "homeworkContent": $scope.text,
                    "homeworkId": $stateParams.homeworkId,
                }).$promise.then(
                    function (response) {
                        console.log(response)
                        if (response.errorCode == 0) {
                            toastr.success("更新成功")
                            $state.go('index.homeworkManagement', {classId: $stateParams.classId});

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
        $scope.cloudwares = [{
            label: "Rstudio",
            value: 1,
        }, {
            label: "Python",
            value: 2,
        }, {
            label: "Base",
            value: 3,
        }, {
            label: "Hadoop",
            value: 4,
        }, {
            label: "JupyterPython",
            value: 5,
        }, {
            label: "IdeJava",   // just display
            value: 6,
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