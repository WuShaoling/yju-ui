(function() {
    'use strict';

    angular
        .module('phoenix')
        .controller('courseDetail1Ctrl', courseDetail1Ctrl);

    courseDetail1Ctrl.$inject = ['$scope', '$stateParams', 'courseSrv', 'commonSrv'];

    function courseDetail1Ctrl($scope, $stateParams, courseSrv, commonSrv) {
        var vm = this;
        $scope.doEx = function() {
            if (localStorage['logined'] == "1") {
                toastr.success("dodododo")
            } else {
                $state.go('login');
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
                    $scope.teacherName = response.data.teacherName;
                    $scope.classNum = response.data.classNum;
                    $scope.studentNum = response.data.studentNum;
                }
            },
            function(error) {
                //toastr.error("not found");
            }
        )

        ////////////////


    }
})();