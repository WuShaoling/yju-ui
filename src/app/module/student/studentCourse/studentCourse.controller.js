(function() {
    'use strict';

    angular
        .module('phoenix')
        .controller('studentCourseCtrl', studentCourseCtrl);

    studentCourseCtrl.$inject = ['$scope', 'stuCourseSrv'];

    function studentCourseCtrl($scope, stuCourseSrv) {
        $scope.courses = []
        stuCourseSrv.getSelfCourse().get({
            studentId: localStorage['userId']
        }, function(response) {
            console.log(response);
            if (response.errorCode == 0) {
                $scope.courses = response.data.studentClassList;
            } else {
                toastr.error(response.message)
            }
        }, function(error) {
            console.log(error);
        })


    }
})();