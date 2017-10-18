(function() {
    'use strict';

    angular
        .module('phoenix')
        .controller('teacherCourseManagementCtrl', teacherCourseManagementCtrl);

    teacherCourseManagementCtrl.$inject = ['$scope', '$uibModal', 'stuCourseSrv', '$stateParams'];

    function teacherCourseManagementCtrl($scope, $uibModal, stuCourseSrv, $stateParams) {
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