(function() {
    'use strict';

    angular
        .module('phoenix')
        .controller('courseMaintainenceCtrl', courseMaintainenceCtrl)
        .controller('addNewExperimentCtrl', addNewExperimentCtrl)
        .controller('addNewHomeworkCtrl', addNewHomeworkCtrl);


    addNewHomeworkCtrl.$inject = ['$scope', '$uibModalInstance']

    function addNewHomeworkCtrl($scope, $uibModalInstance) {
        $scope.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        }
        $scope.ok = function() {

            $uibModalInstance.close();
        }

    }
    addNewExperimentCtrl.$inject = ['$scope', '$uibModalInstance']

    function addNewExperimentCtrl($scope, $uibModalInstance) {
        $scope.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        }
        $scope.ok = function() {

            $uibModalInstance.close();
        }

    }

    courseMaintainenceCtrl.$inject = ['$scope', '$uibModal'];

    function courseMaintainenceCtrl($scope, $uibModal) {
        var vm = this;
        $scope.addNewEx = function() {
            var modalInstance = $uibModal.open({
                size: "lg",
                templateUrl: 'app/module/modal/addNewExperiment.html',
                controller: addNewExperimentCtrl
            });


            modalInstance.result.then(function(result) {
                console.log(result);
                if (result.errorCode === "000") {
                    toastr.success("修改成功");


                }
            }, function(reason) {
                console.log(reason);
            });
        }
        $scope.addNewHw = function() {
            var modalInstance = $uibModal.open({
                size: "lg",
                templateUrl: 'app/module/modal/addNewHomework.html',
                controller: addNewExperimentCtrl
            });


            modalInstance.result.then(function(result) {

            }, function(reason) {
                console.log(reason);
            });
        }
        $scope.deleteEx = function(ex) {
            swal({
                    title: "确定要删除吗？",
                    text: "【" + ex.courseName + "】将被删除",
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

                        swal({
                            title: "删除成功咯",
                            // text: "项目【" + projectName + "】已删除咯",
                            type: "success",
                            showCancelButton: false,
                            // confirmButtonColor: "#DD6B55",
                            confirmButtonText: "确定",
                            closeOnConfirm: true,
                            closeOnCancel: true
                        }, function() {});
                        // toastr.success("删除成功!");
                    }
                });
        }

        $scope.deleteHw = function(hw) {

            swal({
                    title: "确定要删除吗？",
                    text: "【" + hw.courseName + "】将被删除",
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
                        // toastr.success("删除成功!");
                    }
                });
        }
        $scope.courseDetail = [{
            moduleName: "课程1",
            moduleExperiment: [{
                id: "123",
                courseName: "R语言编程基础实验",
                courseDes: "描述",
                teacherName: "王老师",
                dueDate: "",
                date: "Jul 14, 2013",
                completed: 0
            }, {
                id: "123",
                courseName: "R语言统计建模与分析基础实验",
                courseDes: "描述",
                teacherName: "王老师",
                dueDate: "",
                date: "Jul 14, 2013",
                completed: 0
            }, {
                id: "123",
                courseName: "Python语言编程基础实验",
                courseDes: "描述",
                teacherName: "王老师",
                dueDate: "",
                date: "Jul 14, 2013",
                completed: 0
            }],
            moduleHomework: [{
                id: "123",
                courseName: "R语言编程基础实验",
                courseDes: "描述",
                teacherName: "王老师",
                dueDate: "",
                date: "Jul 14, 2013",
                completed: 0
            }, {
                id: "123",
                courseName: "R语言统计建模与分析基础实验",
                courseDes: "描述",
                teacherName: "王老师",
                dueDate: "",
                date: "Jul 14, 2013",
                completed: 0
            }, {
                id: "123",
                courseName: "Python语言编程基础实验",
                courseDes: "描述",
                teacherName: "王老师",
                dueDate: "",
                date: "Jul 14, 2013",
                completed: 0
            }]
        }, {
            moduleName: "课程2",
            moduleExperiment: [{
                id: "123",
                courseName: "R语言编程基础实验",
                courseDes: "描述",
                teacherName: "王老师",
                dueDate: "",
                date: "Jul 14, 2013",
                completed: 0
            }, {
                id: "123",
                courseName: "R语言统计建模与分析基础实验",
                courseDes: "描述",
                teacherName: "王老师",
                dueDate: "",
                date: "Jul 14, 2013",
                completed: 0
            }, {
                id: "123",
                courseName: "Python语言编程基础实验",
                courseDes: "描述",
                teacherName: "王老师",
                dueDate: "",
                date: "Jul 14, 2013",
                completed: 0
            }],
            moduleHomework: [{
                id: "123",
                courseName: "R语言编程基础实验",
                courseDes: "描述",
                teacherName: "王老师",
                dueDate: "",
                date: "Jul 14, 2013",
                completed: 0
            }, {
                id: "123",
                courseName: "R语言统计建模与分析基础实验",
                courseDes: "描述",
                teacherName: "王老师",
                dueDate: "",
                date: "Jul 14, 2013",
                completed: 0
            }, {
                id: "123",
                courseName: "Python语言编程基础实验",
                courseDes: "描述",
                teacherName: "王老师",
                dueDate: "",
                date: "Jul 14, 2013",
                completed: 0
            }]
        }]

    }
})();