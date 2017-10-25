(function() {
    'use strict';

    angular
        .module('phoenix')
        .controller('courseDetail1Ctrl', courseDetail1Ctrl);

    courseDetail1Ctrl.$inject = ['$scope', '$stateParams', 'courseSrv', 'courseManagementSrv'];

    function courseDetail1Ctrl($scope, $stateParams, courseSrv, courseManagementSrv) {
        var vm = this;
        $scope.doEx = function() {
            if (localStorage['logined'] == "1") {
                toastr.success("dodododo")
            } else {
                $state.go('login');
            }
        }
        courseManagementSrv.getCourseDetail().get({
            courseId: $stateParams.courseId
        }).$promise.then(
            function(response) {
                if (response.errorCode == 0) {
                    toastr.success("get it");
                    console.log(response)
                    $scope.courseName = response.data.courseName;
                    $scope.moduleList = response.data.moduleList;
                }
            },
            function(error) {
                toastr.error("not found");
            }
        )

        ////////////////


    }
})();