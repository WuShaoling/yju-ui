(function() {
    'use strict';

    angular
        .module('phoenix')
        .controller('studentCourseDetailCtrl', studentCourseDetailCtrl);

    studentCourseDetailCtrl.$inject = ['$scope', '$state', 'stuCourseSrv', '$stateParams'];

    function studentCourseDetailCtrl($scope, $state, stuCourseSrv, $stateParams) {
        $scope.checkCourseHomework = function() {
            $state.go('index.studentHomework', { classId: $stateParams.classId })
        }
        $scope.startExp = function() {

            $state.go('index.cloudware.experiment');
        }
        $scope.doHomework = function() {
            $state.go('index.studentDoHomework');
        }
        stuCourseSrv.getCourseDetail().get({
                courseId: $stateParams.courseId
            },
            function(response) {
                console.log(response)
                $scope.courseContent = response.data;
                for (var i in $scope.courseContent) {
                    $scope.condition.push({
                        label: $scope.courseContent[i].moduleName,
                        value: $scope.courseContent[i].moduleName
                    })
                    $scope.q = $scope.condition[0].value

                }
            },
            function(error) {
                console.log(error);
            })
        $scope.courseContent = []
        $scope.condition = [{
            label: "全部",
            value: ""
        }]




    }
})();