(function() {
    'use strict';

    angular
        .module('phoenix')
        .controller('courseDetail1Ctrl', courseDetail1Ctrl);

    courseDetail1Ctrl.$inject = ['$scope'];

    function courseDetail1Ctrl($scope) {
        var vm = this;
        $scope.doEx = function() {
            if (localStorage['logined'] == "1") {
                toastr.success("dodododo")
            } else {
                $state.go('login');
            }
        }

        activate();

        ////////////////

        function activate() {}
    }
})();