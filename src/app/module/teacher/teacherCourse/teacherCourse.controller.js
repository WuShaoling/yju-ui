(function() {
    'use strict';

    angular
        .module('phoenix')
        .controller('teacherCourseCtrl', teacherCourseCtrl);

    teacherCourseCtrl.$inject = ['$scope', '$state'];

    function teacherCourseCtrl($scope, $state) {


        $scope.edit = function(item) {
                $state.go('index.teacherCourseManagement');
            }
            // $.get("app/module/teacher/teacherCourse/test.md", function(result) {
            //     // console.log(result)
            //     if (result == null) {
            //         return
            //     }
            //     // console.log(result.label_type)
            //     document.getElementById('content').innerHTML =
            //         marked(result);
            // });


        $scope.courseContent = [{
            moduleName: "课程名称",
            moduleContent: [{
                id: "123",
                classId: 1,
                className: "1班",
                courseName: "R语言编程基础实验",
                courseDes: "描述",
                teacherName: "王老师",
                dueDate: "",
                date: "Jul 14, 2013",
                completed: 0
            }, {
                id: "123",
                classId: 1,
                className: "2班",
                courseName: "R语言统计建模与分析基础实验",
                courseDes: "描述",
                teacherName: "王老师",
                dueDate: "",
                date: "Jul 14, 2013",
                completed: 0
            }, {
                id: "123",
                classId: 1,
                className: "3班",
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