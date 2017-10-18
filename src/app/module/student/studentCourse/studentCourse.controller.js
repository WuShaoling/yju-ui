(function() {
    'use strict';

    angular
        .module('phoenix')
        .controller('studentCourseCtrl', studentCourseCtrl);

    studentCourseCtrl.$inject = ['$scope', 'stuCourseSrv'];

    function studentCourseCtrl($scope, stuCourseSrv) {
        $scope.courses = []
        stuCourseSrv.getSelfCourse().get({
            studentId: JSON.parse(localStorage['user']).username
        }, function(response) {
            console.log(response);
            $scope.courses = response.data;
        }, function(error) {
            console.log(error);
        })


    }
})();