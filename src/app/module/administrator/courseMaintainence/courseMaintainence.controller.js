(function() {
    'use strict';

    angular
        .module('phoenix')
        .controller('courseMaintainenceCtrl', courseMaintainenceCtrl)
        .controller('addNewExperimentCtrl', addNewExperimentCtrl)

    .controller('addNewModuleModalCtrl', addNewModuleModalCtrl);


    addNewModuleModalCtrl.$inject = ['$scope', '$uibModalInstance', 'courseManagementSrv', '$stateParams']

    function addNewModuleModalCtrl($scope, $uibModalInstance, courseManagementSrv, $stateParams) {
        $scope.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        }
        $scope.moduleName = ""
        $scope.ok = function() {
            if ($scope.moduleName == "") {
                toastr.error("请输入模块名称！")
                return
            }
            courseManagementSrv.addModule().save({
                "courseId": $stateParams.courseId,
                "name": $scope.moduleName
            }, function(response) {
                console.log(response);
                if (response.errorCode == 0) {
                    toastr.success("添加成功");
                    var newModule = {
                        moduleName: $scope.moduleName,
                        moduleId: response.data.moduleId,
                        moduleContent: [],
                    }
                    $uibModalInstance.close(newModule);
                } else {
                    toastr.error(response.message)
                }
            }, function(error) {
                toastr.error("添加失败，请稍后再试");
            })

        }

    }


    addNewExperimentCtrl.$inject = ['$scope', '$uibModalInstance', '$timeout', 'courseManagementSrv']

    function addNewExperimentCtrl($scope, $uibModalInstance, $timeout, courseManagementSrv) {
        var converter = new showdown.Converter();
        $scope.change = function(tab) {
            switch (tab) {
                case 0:

                    break;
                case 1:
                    $timeout(function() {
                        var testEditor = editormd("test-editormd", {
                            path: 'lib/',
                            height: 600,
                        });
                    })
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
        $scope.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        }
        $scope.ok = function() {

            $uibModalInstance.close({
                id: "123",
                courseName: "C语言编程基础实验",
                courseDes: "描述",
                teacherName: "王老师",
                dueDate: "",
                date: new Date(),
                completed: 0
            });
        }

    }

    courseMaintainenceCtrl.$inject = ['$scope', '$uibModal', 'courseManagementSrv', '$stateParams', '$state'];

    function courseMaintainenceCtrl($scope, $uibModal, courseManagementSrv, $stateParams, $state) {
        $scope.getEx = function() {
            courseManagementSrv.getCourseDetail().get({
                    courseId: $stateParams.courseId
                }, function(response) {
                    console.log(response);
                    if (response.errorCode == 0) {
                        $scope.courseDetail = response.data

                    } else {
                        toastr.error(response.message)
                    }
                },
                function(error) {
                    toastr.error("获取课程详情失败，请稍后再试")
                })
        }
        $scope.getEx();
        $scope.addModule = function() {
            var modalInstance = $uibModal.open({

                templateUrl: 'app/module/modal/addNewModuleModal.html',
                controller: 'addNewModuleModalCtrl'

            });


            modalInstance.result.then(function(result) {
                console.log(result);
                $scope.courseDetail.moduleList.push(result)
            });
        }
        $scope.addNewEx = function(item) {
            var modalInstance = $uibModal.open({
                size: "lg",
                templateUrl: 'app/module/modal/addNewExperiment.html',
                controller: addNewExperimentCtrl
            });


            modalInstance.result.then(function(result) {
                for (var i in $scope.courseDetail) {
                    if (item.moduleId == $scope.courseDetail[i].moduleId) {
                        $scope.courseDetail[i].moduleExperiment.push(result)
                        break
                    }
                }
            }, function(reason) {
                console.log(reason);
            });
        }
        $scope.checkEx = function(item) {
            if (item.cloudwareType === 'jupyter_python') {
                $state.go('index.startExperiment.notebook', { experimentId: item.id, studentId: localStorage['userId'], cloudwareType: item.cloudwareType });
            } else if (item.cloudwareType === 'webide') {
                $state.go('index.startExperiment.webide', { experimentId: item.id, studentId: localStorage['userId'], cloudwareType: item.cloudwareType });
            } else {
                $state.go('index.startExperiment.cloudware', { experimentId: item.id, studentId: localStorage['userId'], cloudwareType: item.cloudwareType });

            }
        }

        $scope.deleteModule = function(item) {
            swal({
                    title: "确定要删除吗？",
                    text: "【" + item.moduleName + "】下所有实验和作业都将被删除",
                    type: "error",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "确定",
                    closeOnConfirm: false,
                    cancelButtonText: "取消",
                    closeOnCancel: true
                },
                function(isConfirm) {

                    if (isConfirm) {
                        courseManagementSrv.deleteModule().save({
                                "moduleId": item.moduleId
                            }, function(response) {
                                if (response.errorCode == 0) {
                                    for (var i in $scope.courseDetail.moduleList) {
                                        if (item.moduleId == $scope.courseDetail.moduleList[i].moduleId) {
                                            $scope.courseDetail.moduleList.splice(i, 1);
                                            break
                                        }
                                    }
                                    swal({
                                        title: "删除成功咯",
                                        // text: "项目【" + projectName + "】已删除咯",
                                        type: "success",
                                        showCancelButton: false,
                                        // confirmButtonColor: "#DD6B55",
                                        confirmButtonText: "确定",
                                        closeOnConfirm: true,
                                        closeOnCancel: true
                                    }, function() {

                                    });
                                } else {
                                    toastr.error(response.message)
                                }
                            },
                            function(error) {
                                toastr.error("删除失败");
                            })


                    }
                });
        }

        $scope.deleteEx = function(ex, id, index) {
            swal({
                    title: "确定要删除吗？",
                    text: "【" + ex.experimentName + "】将被删除",
                    type: "error",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "确定",
                    closeOnConfirm: false,
                    cancelButtonText: "取消",
                    closeOnCancel: true
                },
                function(isConfirm) {

                    if (isConfirm) {

                        courseManagementSrv.deleteExperiment().save({
                                "id": ex.id
                            }, function(response) {
                                if (response.errorCode == 0) {
                                    $scope.getEx()
                                    swal({
                                        title: "删除成功咯",
                                        // text: "项目【" + projectName + "】已删除咯",
                                        type: "success",
                                        showCancelButton: false,
                                        // confirmButtonColor: "#DD6B55",
                                        confirmButtonText: "确定",
                                        closeOnConfirm: true,
                                        closeOnCancel: true
                                    }, function() {

                                    });
                                } else {
                                    toastr.error(response.message)
                                }
                            },
                            function(error) {
                                toastr.error("删除失败");
                            })
                    }
                });
        }



    }
})();