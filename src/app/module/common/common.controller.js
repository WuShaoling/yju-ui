(function() {
    'use strict';

    angular
        .module('phoenix')
        .controller('commonCtrl', commonCtrl)
        .controller('loginCtrl', loginCtrl);

    commonCtrl.$inject = ['$scope', '$uibModal', '$state'];
    loginCtrl.$inject = ['$scope', '$uibModalInstance', '$uibModal'];

    function commonCtrl($scope, $uibModal, $state) {
        var vm = this;
        $scope.test = function() {
            vm.searchData = $scope.searchData;

        }


        if (localStorage['logined']) {
            var user = JSON.parse(localStorage['user'])
            $scope.username = user.username;
            $scope.logined = true;
            $scope.navbar = user.navbar;
        }
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
                // windowClass: "animated flipInY"
                size: "sm"
            });


            modalInstance.result.then(function(result) {
                console.log(result);
                if (result.errorCode === "000") {
                    toastr.success("welcome!" + result.username);
                    $scope.navbar = result.navbar;
                    $scope.username = result.username;
                    $scope.logined = true;

                }
            }, function(reason) {
                console.log(reason);
            });
        }

        $scope.logout = function() {
                localStorage.clear();
                $scope.logined = false;
                $scope.navbar = [];
                $state.go('index.main')

            }
            // $scope.register = function() {
            //     toastr.success("res...");
            //     var modalInstance = $uibModal.open({
            //         templateUrl: 'app/module/modal/registerModal.html',
            //         controller: loginCtrl,
            //         // windowClass: "animated flipInY"
            //     });
            // }

        $scope.modifyPass = function() {
            var modalInstance = $uibModal.open({
                templateUrl: 'app/module/modal/modifyPassModal.html',
                controller: loginCtrl,
                // windowClass: "animated flipInY"
            });


            modalInstance.result.then(function(result) {
                console.log(result);
                if (result.errorCode === "000") {
                    toastr.success("修改成功");


                }
            }, function(reason) {
                console.log(reason);
            });
        }
    }


    function loginCtrl($scope, $uibModalInstance, $uibModal) {
        $scope.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        };

        $scope.login = function() {

            if ($scope.user.id == "") {
                toastr.error("不能为空");
                return
            } else if ($scope.user.pass == "") {
                toastr.error("密码不能为空");
                return
            }
            console.log($scope.user)
                //success 
            var params;
            if ($scope.user.type.label == "学生") {
                params = {
                    errorCode: "000",
                    message: "success",
                    username: $scope.user.id,
                    navbar: [{
                        name: "我的课程",
                        class: 'fa fa-table',
                        url: 'index.studentCourse'
                    }],
                    role: $scope.user.type //0:student;1:teacher;2:administrator
                }
            } else if ($scope.user.type.label == "老师") {
                params = {
                    errorCode: "000",
                    message: "success",
                    username: $scope.user.id,
                    navbar: [{
                        name: "我的课程",
                        class: 'fa fa-table',
                        url: 'index.teacherCourse'
                    }],
                    role: $scope.user.type //0:student;1:teacher;2:administrator
                }
            } else if ($scope.user.type.label == "教务") {
                params = {
                    errorCode: "000",
                    message: "success",
                    username: $scope.user.id,
                    navbar: [{
                        name: "教师管理",
                        class: 'fa fa-users',
                        url: 'index.teacherCourse'
                    }, {
                        name: "学期管理",
                        class: 'fa fa-cogs',
                        url: 'index.teacherCourse'
                    }, {
                        name: "课程管理",
                        class: 'fa fa-table',
                        url: 'index.teacherCourse'
                    }, {
                        name: "班级管理",
                        class: 'fa fa-table',
                        url: 'index.classManagement'
                    }],
                    role: $scope.user.type //0:student;1:teacher;2:administrator
                }
            }
            localStorage['logined'] = true;
            localStorage['user'] = JSON.stringify(params);
            $uibModalInstance.close(params);


        }
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
        $scope.user.id = "";
        $scope.user.pass = "";

        $scope.user.type = $scope.usertypes[1];
        // $scope.goLogin = function() {
        //     $scope.cancel();
        //     toastr.success("res...");
        //     var modalInstance = $uibModal.open({
        //         templateUrl: 'app/module/modal/loginModal.html',
        //         controller: loginCtrl,
        //         windowClass: "animated flipInY"
        //     });
        // }
        // $scope.goRegister = function() {
        //     $scope.cancel();
        //     toastr.success("res...");
        //     var modalInstance = $uibModal.open({
        //         templateUrl: 'app/module/modal/registerModal.html',
        //         controller: loginCtrl,
        //         windowClass: "animated flipInY"
        //     });
        // }
    }
})();