(function() {
    'use strict';

    angular
        .module('phoenix')
        .controller('studentHomeworkCtrl', studentHomeworkCtrl);

    studentHomeworkCtrl.$inject = ['$scope', '$state'];

    function studentHomeworkCtrl($scope, $state) {
        $scope.doHomework = function() {
            $state.go('index.cloudware.studentDoHomework');
        }
        $scope.courseContent = [{
            moduleName: "第一课时",
            moduleContent: [{
                id: "123",
                experimentName: "作业一",
                experimentDes: "描述",
                dueDate: "",
                date: "Jul 14, 2013",
                completed: 0
            }, {
                id: "123",
                experimentName: "作业一",
                experimentDes: "描述",
                dueDate: "",
                date: "Jul 14, 2013",
                completed: 0
            }, {
                id: "123",
                experimentName: "作业一",
                experimentDes: "描述",
                dueDate: "",
                date: "Jul 14, 2013",
                completed: 0
            }]
        }, {
            moduleName: "第二课时",
            moduleContent: [{
                id: "123",
                experimentName: "作业一",
                experimentDes: "描述",
                dueDate: "",
                date: "Jul 14, 2013",
                completed: 0
            }, {
                id: "123",
                experimentName: "作业一",
                experimentDes: "描述",
                dueDate: "",
                date: "Jul 14, 2013",
                completed: 0
            }, {
                id: "123",
                experimentName: "作业一",
                experimentDes: "描述",
                dueDate: "",
                date: "Jul 14, 2013",
                completed: 0
            }]
        }, {
            moduleName: "第三课时",
            moduleContent: [{
                id: "123",
                experimentName: "作业一",
                experimentDes: "描述",
                dueDate: "",
                date: "Jul 14, 2013",
                completed: 0
            }, {
                id: "123",
                experimentName: "作业一",
                experimentDes: "描述",
                dueDate: "",
                date: "Jul 14, 2013",
                completed: 0
            }, {
                id: "123",
                experimentName: "作业一",
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