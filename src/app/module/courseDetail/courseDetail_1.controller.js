(function() {
    'use strict';

    angular
        .module('phoenix')
        .controller('courseDetail1Ctrl', courseDetail1Ctrl);

    courseDetail1Ctrl.$inject = ['$scope', '$stateParams', 'courseSrv', 'commonSrv', '$state'];

    function courseDetail1Ctrl($scope, $stateParams, courseSrv, commonSrv, $state) {
        var vm = this;
        $scope.doEx = function(item) {
            if (item.imageTypeId === 1) {
                $state.go("index.startExperiment.cloudware",
                    {experimentId: item.id, studentId: localStorage['userId'] || 0})
            } else if (item.imageTypeId === 2) {

                if (!localStorage['logined']) {
                    toastr.warning("请登录以后查看课程！");
                } else {
                    $state.go('index.startExperiment.notebook', { experimentId: item.id, studentId: localStorage['userId']});
                }

            } else if (item.imageTypeId === 3) {

                if (!localStorage['logined']) {
                    toastr.warning("请登录以后查看课程！");
                } else {
                    $state.go('index.startExperiment.webide', { experimentId: item.id, studentId: localStorage['userId']});
                }
            }
        }

        commonSrv.getCourseExperimentDetail().get({
            courseId: $stateParams.courseId
        }).$promise.then(
            function(response) {
                if (response.errorCode == 0) {
                    //toastr.success("get it");
                    console.log(response)
                    $scope.courseName = response.data.courseName;
                    $scope.moduleList = response.data.moduleList;
                }
            },
            function(error) {
                //toastr.error("not found");
            }
        )
        commonSrv.getCourseDetail().get({
            courseId: $stateParams.courseId
        }).$promise.then(
            function(response) {
                if (response.errorCode == 0) {
                    //toastr.success("get it");
                    console.log(response)
                    $scope.teacherName = response.data.teacherInfo.teacherName;
                    $scope.teacherTitle = response.data.teacherInfo.teacherTitle;
                    $scope.gender = response.data.teacherInfo.gender;
                    $scope.teacherContact = response.data.teacherInfo.teacherContact;
                    $scope.classNum = response.data.classNum;
                    $scope.studentNum = response.data.studentNum;
                    $scope.courseDescription = response.data.courseDescription;
                }
            },
            function(error) {
                //toastr.error("not found");
            }
        )


        // $scope.login = function() {

        //     }
        ////////////////
    }
})();