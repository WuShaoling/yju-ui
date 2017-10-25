(function() {
    'use strict';

    angular
        .module('phoenix')
        .controller('teacherCourseCtrl', teacherCourseCtrl);

    teacherCourseCtrl.$inject = ['$scope', '$state', 'teacherCourseSrv'];

    function teacherCourseCtrl($scope, $state, teacherCourseSrv) {


        $scope.edit = function(item) {
                $state.go('index.teacherCourseManagement', { classId: item.classId });
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

        teacherCourseSrv.getAllCourse().get({ teacherId: localStorage['userId'] },
            function(response) {
                console.log(response)
                if (response.errorCode == 0) {
                    $scope.courseContent = response.data.teacherClassList;

                } else {
                    toastr.error(response.message)
                }
            },
            function(error) {
                console.log(error)
            })
        $scope.courseContent = [];
    }
})();