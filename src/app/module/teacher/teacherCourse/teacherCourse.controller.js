(function() {
    'use strict';

    angular
        .module('phoenix')
        .controller('teacherCourseCtrl', teacherCourseCtrl);

    teacherCourseCtrl.$inject = ['$scope', '$state', 'teacherCourseSrv'];

    function teacherCourseCtrl($scope, $state, teacherCourseSrv) {


        $scope.edit = function(item) {
                $state.go('index.teacherCourseManagement', { courseId: item.id });
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

        teacherCourseSrv.getAllCourse().get({ teacherId: JSON.parse(localStorage['user']).username },
            function(response) {
                console.log(response)
                $scope.courseContent = response.data;
            },
            function(error) {
                console.log(error)
            })
        $scope.courseContent = [];
    }
})();