(function() {
    'use strict';

    angular
        .module('phoenix')
        .controller('studentHomeworkCtrl', studentHomeworkCtrl);

    studentHomeworkCtrl.$inject = ['$scope', '$state', 'stuCourseSrv', '$stateParams'];

    function studentHomeworkCtrl($scope, $state, stuCourseSrv, $stateParams) {
        $scope.doHomework = function(item) {
            $state.go('index.studentDoHomework.cloudware', { homeworkId: item.id });
        }
        stuCourseSrv.getAllHomework().get({
                classId: $stateParams.classId
            }, function(response) {
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
                    }

                    $scope.q = $scope.condition[0].value
                } else {
                    toastr.error(response.message);
                }
            },
            function(error) {
                toastr.error("获取作业失败，请稍后再试");

            })

        $scope.condition = [{
            label: "全部",
            value: ""
        }]


    }
})();