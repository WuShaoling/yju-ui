(function() {
    'use strict';

    angular
        .module('phoenix')
        .controller('homeworkManagementCtrl', homeworkManagementCtrl)
        .controller('addNewExperimentCtrl', addNewExperimentCtrl)
        .controller('addNewHomeworkCtrl', addNewHomeworkCtrl)
        .controller('addNewModuleModalCtrl', addNewModuleModalCtrl);


    addNewModuleModalCtrl.$inject = ['$scope', '$uibModalInstance']

    function addNewModuleModalCtrl($scope, $uibModalInstance) {
        $scope.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        }
        $scope.moduleName = ""
        $scope.ok = function() {
            if ($scope.moduleName == "") {
                toastr.error("请输入模块名称！")
                return
            }
            var newModule = {
                moduleId: 5,
                moduleName: $scope.moduleName,
                moduleExperiment: [],
                moduleHomework: []
            }
            $uibModalInstance.close(newModule);
        }

    }

    addNewHomeworkCtrl.$inject = ['$scope', '$uibModalInstance']

    function addNewHomeworkCtrl($scope, $uibModalInstance) {
        $scope.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        }
        $scope.ok = function() {
            console.log($scope.course.courseName, $scope.course.courseDes)
            var newHw = {
                id: "123",
                courseName: $scope.course.courseName,
                courseDes: $scope.course.courseDes,
                teacherName: "王老师",
                dueDate: "",
                date: new Date(),
                completed: 0
            }
            $uibModalInstance.close(newHw);
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

    homeworkManagementCtrl.$inject = ['$scope', '$uibModal'];

    function homeworkManagementCtrl($scope, $uibModal) {


        var vm = this;
        $scope.addModule = function() {
            var modalInstance = $uibModal.open({

                templateUrl: 'app/module/modal/addNewModuleModal.html',
                controller: 'addNewModuleModalCtrl'
            });


            modalInstance.result.then(function(result) {
                console.log(result);
                $scope.courseDetail.push(result)

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
                        for (var i in $scope.courseDetail) {
                            if (item.moduleId == $scope.courseDetail[i].moduleId) {
                                $scope.courseDetail.splice(i, 1);
                                $scope.$apply()
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
                        }, function() {});
                        // toastr.success("删除成功!");
                    }
                });
        }
        $scope.addNewHw = function(item) {

            var modalInstance = $uibModal.open({

                templateUrl: 'app/module/modal/addNewHomework.html',
                controller: addNewHomeworkCtrl
            });


            modalInstance.result.then(function(result) {
                for (var i in $scope.courseDetail) {
                    if (item.moduleId == $scope.courseDetail[i].moduleId) {
                        $scope.courseDetail[i].moduleHomework.push(result)
                        break
                    }
                }
            }, function(reason) {
                console.log(reason);
            });
        }
        $scope.deleteEx = function(ex, id, index) {
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
                        for (var i in $scope.courseDetail) {
                            if (id == $scope.courseDetail[i].moduleId) {
                                $scope.courseDetail[i].moduleExperiment.splice(index, 1);
                                $scope.$apply()
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
                        }, function() {});
                        // toastr.success("删除成功!");
                    }
                });
        }

        $scope.deleteHw = function(hw, id, index) {

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
                        for (var i in $scope.courseDetail) {
                            if (id == $scope.courseDetail[i].moduleId) {
                                $scope.courseDetail[i].moduleHomework.splice(index, 1);
                                $scope.$apply()
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
                        // toastr.success("删除成功!");
                    }
                });
        }
        $scope.courseDetail = [{
            moduleId: 0,
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
            moduleId: 1,
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