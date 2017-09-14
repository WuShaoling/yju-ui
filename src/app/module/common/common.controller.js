(function() {
    'use strict';

    angular
        .module('phoenix')
        .controller('commonCtrl', commonCtrl)
        .controller('loginCtrl', loginCtrl);

    commonCtrl.$inject = ['$scope', '$uibModal'];
    loginCtrl.$inject = ['$scope'];

    function commonCtrl($scope, $uibModal) {
        $scope.phone = "17612157384";
        $scope.email = "juny12324@gmail.com";
        $scope.login = function() {
            // toastr.success("login...");
            var modalInstance = $uibModal.open({
                templateUrl: 'app/module/modal/loginModal.html',
                controller: loginCtrl,
                // windowClass: "animated flipInY"
            });
        }
    }


    function loginCtrl($scope) {

    }
})();