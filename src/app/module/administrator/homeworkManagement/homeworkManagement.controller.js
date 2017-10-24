(function() {
    'use strict';

    angular
        .module('phoenix')
        .controller('homeworkManagementCtrl', homeworkManagementCtrl)
        .controller('addNewHomeworkCtrl', addNewHomeworkCtrl)





    addNewHomeworkCtrl.$inject = ['$scope', '$uibModalInstance', 'module', 'classManagementSrv', '$stateParams']

    function addNewHomeworkCtrl($scope, $uibModalInstance, module, classManagementSrv, $stateParams) {

        console.log(module)
        $scope.module = module;
        $scope.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        }
        $scope.homework = {}
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
        }];
        $scope.ok = function() {
            if (!$scope.homework.homeworkName) {
                toastr.error("作业名称不能为空");
                return;
            }
            if (!$scope.homework.cloudwareType) {
                toastr.error("容器类型不能为空");
                return;
            }
            classManagementSrv.addHomework().save({
                    "classId": $stateParams.classId,
                    "cloudwareType": $scope.homework.cloudwareType,
                    "homeworkCreateDate": new Date(),
                    "homeworkDes": $scope.homework.homeworkDes,
                    "homeworkDueDate": $scope.homework.dueDate,
                    "homeworkName": $scope.homework.homeworkName,
                    "moduleId": module.moduleId
                }).$promise.then(
                    function(response) {
                        console.log(response)
                        if (response.errorCode == 0) {
                            toastr.success("添加成功")
                            $uibModalInstance.close(1);

                        } else {
                            toastr.error(response.message);
                        }
                    },
                    function(error) {
                        toastr.error("添加失败，请稍后再试");
                    }
                )
                // console.log($scope.course.courseName, $scope.course.courseDes)
                // var newHw = {
                //     id: "123",
                //     courseName: $scope.course.Name,
                //     courseDes: $scope.course.courseDes,
                //     teacherName: "王老师",
                //     dueDate: "",
                //     date: new Date(),
                //     completed: 0
                // }
        }

    }



    homeworkManagementCtrl.$inject = ['$scope', '$uibModal', 'classManagementSrv', '$stateParams'];

    function homeworkManagementCtrl($scope, $uibModal, classManagementSrv, $stateParams) {
        $scope.getHomework = function() {
            classManagementSrv.getHomework().get({
                classId: $stateParams.classId
            }).$promise.then(function(response) {

                    console.log(response);
                    if (response.errorCode == 0) {
                        $scope.courseDetail = response.data;
                    } else {
                        toastr.error(response.message)
                    }
                },
                function(error) {
                    toastr.error("获取作业列表失败，请稍后再试");
                }
            )

        }
        $scope.getHomework();


        $scope.addNewHw = function(item) {
            item['courseName'] = $scope.courseDetail.courseName;
            var modalInstance = $uibModal.open({

                templateUrl: 'app/module/modal/addNewHomework.html',
                controller: addNewHomeworkCtrl,
                resolve: {
                    module: function() { return angular.copy(item); }
                }
            });


            modalInstance.result.then(function(result) {
                // for (var i in $scope.courseDetail) {
                //     if (item.moduleId == $scope.courseDetail[i].moduleId) {
                //         $scope.courseDetail[i].moduleHomework.push(result)
                //         break
                //     }
                // }
                if (result) {
                    $scope.getHomework();
                }

            });
        }


        $scope.deleteHw = function(item) {

            swal({
                    title: "确定要删除吗？",
                    text: "【" + item.homeworkName + "】将被删除",
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
                        classManagementSrv.deleteHomework().save({
                                homeworkId: item.homeworkId
                            }).$promise.then(
                                function(response) {
                                    if (response.errorCode == 0) {
                                        $scope.getHomework();

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
                                    toastr.error("删除失败，请稍后再试")
                                }
                            )
                            // for (var i in $scope.courseDetail) {
                            //     if (id == $scope.courseDetail[i].moduleId) {
                            //         $scope.courseDetail[i].moduleHomework.splice(index, 1);
                            //         $scope.$apply()
                            //         break
                            //     }
                            // }

                        // toastr.success("删除成功!");
                    }
                });
        }



    }
})();