(function() {
    'use strict';

    angular
        .module('phoenix')
        .controller('teacherCourseManagementCtrl', teacherCourseManagementCtrl)
        .controller('addNewExperimentCtrl', addNewExperimentCtrl);

    teacherCourseManagementCtrl.$inject = ['$scope', '$uibModal'];
    addNewExperimentCtrl.$inject = ['$scope']

    function teacherCourseManagementCtrl($scope, $uibModal) {
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
        $scope.courseContent = [{
            moduleName: "第一课时",
            moduleContent: [{
                id: "123",
                experimentName: "实验一",
                experimentDes: "描述",
                dueDate: "",
                date: "Jul 14, 2013",
                completed: 0
            }, {
                id: "123",
                experimentName: "实验一",
                experimentDes: "描述",
                dueDate: "",
                date: "Jul 14, 2013",
                completed: 0
            }, {
                id: "123",
                experimentName: "实验一",
                experimentDes: "描述",
                dueDate: "",
                date: "Jul 14, 2013",
                completed: 0
            }]
        }, {
            moduleName: "第二课时",
            moduleContent: [{
                id: "123",
                experimentName: "实验一",
                experimentDes: "描述",
                dueDate: "",
                date: "Jul 14, 2013",
                completed: 0
            }, {
                id: "123",
                experimentName: "实验一",
                experimentDes: "描述",
                dueDate: "",
                date: "Jul 14, 2013",
                completed: 0
            }, {
                id: "123",
                experimentName: "实验一",
                experimentDes: "描述",
                dueDate: "",
                date: "Jul 14, 2013",
                completed: 0
            }]
        }, {
            moduleName: "第三课时",
            moduleContent: [{
                id: "123",
                experimentName: "实验一",
                experimentDes: "描述",
                dueDate: "",
                date: "Jul 14, 2013",
                completed: 0
            }, {
                id: "123",
                experimentName: "实验一",
                experimentDes: "描述",
                dueDate: "",
                date: "Jul 14, 2013",
                completed: 0
            }, {
                id: "123",
                experimentName: "实验一",
                experimentDes: "描述",
                dueDate: "",
                date: "Jul 14, 2013",
                completed: 0
            }]
        }];

        $scope.condition = [{
            label: "全部",
            value: ""
        }]

        for (var i in $scope.courseContent) {
            $scope.condition.push({
                label: $scope.courseContent[i].moduleName,
                value: $scope.courseContent[i].moduleName
            })
        }

        $scope.q = $scope.condition[0].value

    }

    function addNewExperimentCtrl($scope) {

    }
})();