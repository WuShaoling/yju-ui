(function() {
    'use strict';

    angular
        .module('phoenix')
        .controller('commonCtrl', commonCtrl)
        .controller('loginCtrl', loginCtrl);

    commonCtrl.$inject = ['$scope', '$uibModal'];
    loginCtrl.$inject = ['$scope', '$uibModalInstance', '$uibModal'];

    function commonCtrl($scope, $uibModal) {
        $scope.search = function(data) {
            toastr.success("正在搜索" + data + "...");
        }
        $scope.phone = "17612157384";
        $scope.email = "juny12324@gmail.com";
        $scope.login = function() {
            // toastr.success("login...");
            var modalInstance = $uibModal.open({
                templateUrl: 'app/module/modal/loginModal.html',
                controller: loginCtrl,
                windowClass: "animated flipInY"
            });
        }
        $scope.register = function() {
            toastr.success("res...");
            var modalInstance = $uibModal.open({
                templateUrl: 'app/module/modal/registerModal.html',
                controller: loginCtrl,
                windowClass: "animated flipInY"
            });
        }
    }


    function loginCtrl($scope, $uibModalInstance, $uibModal) {
        $scope.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        };

        $scope.usertypes = [{
            "label": "老师",
            "value": "教职工编号"
        }, {
            "label": "学生",
            "value": "学生编号"
        }, {
            "label": "教务",
            "value": "教职工编号"
        }]
        $scope.user = {};

        $scope.user.type = $scope.usertypes[1];
        $scope.goLogin = function() {
            $scope.cancel();
            toastr.success("res...");
            var modalInstance = $uibModal.open({
                templateUrl: 'app/module/modal/loginModal.html',
                controller: loginCtrl,
                windowClass: "animated flipInY"
            });
        }
        $scope.goRegister = function() {
            $scope.cancel();
            toastr.success("res...");
            var modalInstance = $uibModal.open({
                templateUrl: 'app/module/modal/registerModal.html',
                controller: loginCtrl,
                windowClass: "animated flipInY"
            });
        }
    }
})();