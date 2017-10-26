(function() {
    'use strict';

    angular
        .module('phoenix')
        .controller('checkHomeworkCtrl', checkHomeworkCtrl)
        .controller('checkReportModalCtrl', checkReportModalCtrl)
        .controller('gradeModalCtrl', gradeModalCtrl);

    checkHomeworkCtrl.$inject = ['$scope', '$uibModal', '$stateParams', 'teacherCourseSrv', 'stuCourseSrv'];
    checkReportModalCtrl.$inject = ['$scope', '$uibModalInstance', '$timeout', 'homework']
    gradeModalCtrl.$inject = ['$scope', '$uibModalInstance', '$timeout', 'teacherCourseSrv', 'homeworkId']

    function gradeModalCtrl($scope, $uibModalInstance, $timeout, teacherCourseSrv, homeworkId) {
        $scope.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        }
        console.log(homeworkId)
        $scope.score = null;
        $scope.comments = null
        $scope.ok = function() {
            if (!$scope.score) {
                toastr.error("请输入分数");
                return;
            } else {
                if (parseInt($scope.score) > 100) {
                    $scope.score = 100;
                }
            }
            teacherCourseSrv.grade().save({
                "comment": $scope.comments,
                "grade": $scope.score,
                "studentHomeworkId": homeworkId
            }).$promise.then(
                function(response) {

                    if (response.errorCode == 0) {
                        toastr.success("评分成功");
                    } else {
                        toastr.error(response.message)
                    }
                },
                function(error) {

                    toastr.error("评分失败")

                }
            )
            $uibModalInstance.close();
        }
    }

    function checkReportModalCtrl($scope, $uibModalInstance, $timeout, homework) {
        console.log(homework)
        $scope.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        }
        $.get(homework.homeworkUrl, function(result) {
            console.log(result)
            if (result == null) {
                return
            }
            $scope.text = result;
            console.log($scope.text);


            // console.log(result.label_type)

        });

        $scope.ok = function() {

            $uibModalInstance.close();
        }
    }

    function checkHomeworkCtrl($scope, $uibModal, $stateParams, teacherCourseSrv, stuCourseSrv) {
        var vm = this;
        // stuCourseSrv.getHomeworkDetail().get({
        //     homeworkId: $stateParams.homeworkId
        // }, function(response) {
        //     console.log(response);
        //     // $scope.detail = response.data

        // }, function(error) {
        //     console.log(error);
        // })
        $scope.studentHomeworkId = $stateParams.studentHomeworkId
        teacherCourseSrv.getStuHomeworkDetail().get({
                studentHomeworkId: $stateParams.studentHomeworkId
            }).$promise.then(function(response) {
                    console.log(response)
                    if (response.errorCode == 0) {
                        $scope.detail = response.data
                    } else {
                        toastr.error(response.message)
                    }
                },
                function(error) {
                    console.log(error);
                    toastr.error("获取作业详情失败，请稍后再试")

                })
            // teacherCourseSrv.getHwDetail().get({
            //         id: $stateParams.id
            //     },
            //     function(response) {
            //         console.log(response);
            //     },
            //     function(error) {
            //         console.log(error)
            //     })
        $scope.grade = function(homeworkId) {
            var modalInstance = $uibModal.open({
                // size: "",
                templateUrl: 'app/module/modal/gradeModal.html',
                controller: 'gradeModalCtrl',
                resolve: {
                    homeworkId: function() {
                        return angular.copy(homeworkId);
                    }
                }
            });


            modalInstance.result.then(function(result) {

            });
        }
        $scope.checkReport = function() {
            var modalInstance = $uibModal.open({
                size: 'lg',
                templateUrl: 'app/module/modal/checkReportModal.html',
                controller: 'checkReportModalCtrl',
                resolve: {
                    homework: function() {
                        return angular.copy($scope.detail)
                    }
                }
            });


            // modalInstance.rendered.then(function(result) {
            //     console.log(result);
            // });
            modalInstance.result.then(function(result) {
                console.log(result);

            });
        }
    }
})();