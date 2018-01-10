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
        $scope.startExp = function(item) {
            if (item.cloudwareType === 'jupyter_python') {
                $state.go('index.startExperiment.notebook', { experimentId: item.id, studentId: localStorage['userId'], cloudwareType: item.cloudwareType });
            } else if (item.cloudwareType === 'webide') {
                $state.go('index.startExperiment.webide', { experimentId: item.id, studentId: localStorage['userId'], cloudwareType: item.cloudwareType });
            } else {
                $state.go('index.startExperiment.cloudware', {
                    experimentId: item.id,
                    studentId: localStorage['userId'],
                    cloudwareType: item.cloudwareType
                });
            }
        }
        $scope.doHomework = function() {
            $state.go('index.studentDoHomework');
        }
        stuCourseSrv.getCourseDetail().get({
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