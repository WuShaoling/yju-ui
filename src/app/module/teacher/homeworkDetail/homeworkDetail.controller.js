(function() {
    'use strict';

    angular
        .module('phoenix')
        .controller('homeworkDetailCtrl', homeworkDetailCtrl);

    homeworkDetailCtrl.$inject = ['$scope', '$uibModal'];

    function homeworkDetailCtrl($scope, $uibModal) {
        $scope.grade = function() {
            var modalInstance = $uibModal.open({
                // size: "",
                templateUrl: 'app/module/modal/gradeModal.html',
                // controller: addNewExperimentCtrl
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
            homeworkName: "作业1",
            condition: "",
            student: [{
                id: "123",
                name: "张君义",
                studentId: "1352890",
                dueDate: "",
                date: "Jul 14, 2013",
                completed: 0
            }, {
                id: "123",
                name: "张君义",
                studentId: "1352890",
                dueDate: "",
                date: "Jul 14, 2013",
                completed: 1
            }, {
                id: "123",
                name: "张君义",
                studentId: "1352890",
                dueDate: "",
                date: "Jul 14, 2013",
                completed: 1
            }]
        }, {
            homeworkName: "作业二",
            student: [{
                id: "123",
                name: "张君义",
                studentId: "1352890",
                dueDate: "",
                date: "Jul 14, 2013",
                completed: 0
            }, {
                id: "123",
                name: "张君义",
                studentId: "1352890",
                dueDate: "",
                date: "Jul 14, 2013",
                completed: 0
            }, {
                id: "123",
                name: "张君义",
                studentId: "1352890",
                dueDate: "",
                date: "Jul 14, 2013",
                completed: 0
            }]
        }, {
            homeworkName: "作业三",
            student: [{
                id: "123",
                name: "张君义",
                studentId: "1352890",
                dueDate: "",
                date: "Jul 14, 2013",
                completed: 0
            }, {
                id: "123",
                name: "张君义",
                studentId: "1352890",
                dueDate: "",
                date: "Jul 14, 2013",
                completed: 0
            }, {
                id: "123",
                name: "张君义",
                studentId: "1352890",
                dueDate: "",
                date: "Jul 14, 2013",
                completed: 0
            }]
        }];

        $scope.condition = [{
            label: "全部",
            value: ""
        }]

        $scope.condition1 = [{
            label: "全部",
            value: -1
        }, {
            label: "已提交",
            value: 1
        }, {
            label: "未提交",
            value: 0
        }]
        $scope.change = function() {
            console.log($scope.p);
            console.log($scope.q);

        }

        $scope.filterFunc = function(e) {
            // console.log(e);
            if ($scope.p == -1) { return e } else { return e.completed == $scope.p }

        }
        for (var i in $scope.courseContent) {
            $scope.condition.push({
                label: $scope.courseContent[i].homeworkName,
                value: $scope.courseContent[i].homeworkName
            })
        }

        $scope.q = $scope.condition[0].value
        $scope.p = $scope.condition1[0].value

    }
})();