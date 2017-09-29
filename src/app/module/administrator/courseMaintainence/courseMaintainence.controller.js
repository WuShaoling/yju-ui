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
    addNewExperimentCtrl.$inject = ['$scope', '$uibModalInstance', '$timeout']

    function addNewExperimentCtrl($scope, $uibModalInstance, $timeout) {
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

            $uibModalInstance.close();
        }

    }

    courseMaintainenceCtrl.$inject = ['$scope', '$uibModal'];

    function courseMaintainenceCtrl($scope, $uibModal) {


        var vm = this;
        $scope.addModule = function() {
            var modalInstance = $uibModal.open({

                templateUrl: 'app/module/modal/addNewModuleModal.html',
                // controller: addNewExperimentCtrl
            });


            modalInstance.result.then(function(result) {
                console.log(result);

            }, function(reason) {
                console.log(reason);
            });
        }
        $scope.addNewEx = function() {
            var modalInstance = $uibModal.open({
                size: "lg",
                templateUrl: 'app/module/modal/addNewExperiment.html',
                controller: addNewExperimentCtrl
            });


            modalInstance.result.then(function(result) {

            }, function(reason) {
                console.log(reason);
            });
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
        $scope.addNewHw = function() {
            var modalInstance = $uibModal.open({

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
            moduleName: "课时1",
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
            moduleName: "课时2",
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