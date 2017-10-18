(function() {
    'use strict';

    angular
        .module('phoenix')
        .controller('courseDetail1Ctrl', courseDetail1Ctrl);

    courseDetail1Ctrl.$inject = ['$scope', '$stateParams', 'courseSrv'];

    function courseDetail1Ctrl($scope, $stateParams, courseSrv) {
        var vm = this;
        $scope.doEx = function() {
            if (localStorage['logined'] == "1") {
                toastr.success("dodododo")
            } else {
                $state.go('login');
            }
        }
        courseSrv.getCourseDetail().get({
            courseId: $stateParams.courseId
        }).$promise.then(
            function(response) {
                toastr.success("get it");
            },
            function(error) {
                toastr.error("not found");
            }
        )

        ////////////////


    }
})();