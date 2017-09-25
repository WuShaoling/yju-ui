(function() {
    'use strict';

    angular
        .module('phoenix')
        .controller('studentCourseDetailCtrl', studentCourseDetailCtrl);

    studentCourseDetailCtrl.$inject = ['$scope', '$state'];

    function studentCourseDetailCtrl($scope, $state) {
        $scope.checkCourseHomework = function() {
            $state.go('index.studentHomework')
        }
        $scope.startExp = function() {

            $state.go('index.StartExperiment');
        }
        $scope.doHomework = function() {
            $state.go('index.studentDoHomework');
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
        }]
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
})();