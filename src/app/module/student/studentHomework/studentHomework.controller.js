(function() {
    'use strict';

    angular
        .module('phoenix')
        .controller('studentHomeworkCtrl', studentHomeworkCtrl);

    studentHomeworkCtrl.$inject = ['$scope', '$state', 'stuCourseSrv', '$stateParams'];

    function studentHomeworkCtrl($scope, $state, stuCourseSrv, $stateParams) {
        $scope.doHomework = function(item) {
            $state.go('index.studentDoHomework.cloudware', { homeworkId: item.id, studentId: localStorage['userId'], cloudwareType: item.cloudwareType });
        }
        stuCourseSrv.getAllHomework().get({
                classId: $stateParams.classId,
                studentId: localStorage['userId']
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
        $scope.checkGrade = function(item) {
            stuCourseSrv.getHomeworkScore().get({
                homeworkId: item.id,
                studentId: localStorage['userId']
            }).$promise.then(function(response) {
                    console.log(response)
                },
                function(error) { console.log(error) })
            swal({
                title: "确定要删除吗？",
                text: "【" + item.id + "】" + "将被删除",
                type: "success",
                showCancelButton: true,
                // confirmButtonColor: "#DD6B55",
                confirmButtonText: "确定",
                closeOnConfirm: true,
                cancelButtonText: "取消",
                closeOnCancel: true
            })
        }

    }
})();