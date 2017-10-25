(function() {
    'use strict';

    angular
        .module('phoenix')
        .controller('teacherCourseManagementCtrl', teacherCourseManagementCtrl);

    teacherCourseManagementCtrl.$inject = ['$scope', '$uibModal', 'teacherCourseSrv', '$stateParams'];

    function teacherCourseManagementCtrl($scope, $uibModal, teacherCourseSrv, $stateParams) {
        console.log($stateParams)
        teacherCourseSrv.getCourseDetail().get({
                classId: $stateParams.classId
            },
            function(response) {
                console.log(response)
                if (response.errorCode == 0) {
                    $scope.courseId = response.data.courseId;
                    $scope.courseName = response.data.courseName;
                    $scope.courseContent = response.data.moduleList;
                    for (var i in $scope.courseContent) {
                        $scope.condition.push({
                            label: $scope.courseContent[i].moduleName,
                            value: $scope.courseContent[i].moduleName
                        })
                        $scope.q = $scope.condition[0].value
                    }
                } else {
                    toastr.error(response.message);
                }

            },
            function(error) {
                console.log(error);
                toastr.error("获取详情失败，请稍后再试");

            })
        $scope.courseContent = []
        $scope.condition = [{
            label: "全部",
            value: ""
        }]





    }


})();