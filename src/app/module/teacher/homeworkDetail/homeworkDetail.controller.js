(function() {
    'use strict';

    angular
        .module('phoenix')
        .controller('homeworkDetailCtrl', homeworkDetailCtrl);

    homeworkDetailCtrl.$inject = ['$scope'];

    function homeworkDetailCtrl($scope) {
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

        for (var i in $scope.courseContent) {
            $scope.condition.push({
                label: $scope.courseContent[i].homeworkName,
                value: $scope.courseContent[i].homeworkName
            })
        }

        $scope.q = $scope.condition[0].value
    }
})();