(function() {
    'use strict';

    angular
        .module('phoenix')
        .controller('commonCtrl', commonCtrl)
        .controller('loginCtrl', loginCtrl);

    commonCtrl.$inject = ['$scope', '$uibModal', '$state', '$rootScope'];
    loginCtrl.$inject = ['$scope', '$uibModalInstance', '$uibModal', 'commonSrv', '$rootScope', '$state', '$location'];

    function commonCtrl($scope, $uibModal, $state, $rootScope) {
        var vm = this;
        $scope.test = function() {
            vm.searchData = $scope.searchData;

        }
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
                    toastr.success("欢迎" + result.username);
                    $scope.navbar = result.navbar;
                    $scope.username = result.username;
                    $scope.logined = true;
                }
            }, function(reason) {
                console.log(reason);
            });
        }
        $scope.logout = function() {
            var previousRef = localStorage['previousRef']
            localStorage.clear();
            if(previousRef){
                localStorage['previousRef'] = previousRef
            }
            $scope.logined = false;
            $scope.navbar = [];
            $state.go('index.main')
            $rootScope.$broadcast('login');
        }

        if (localStorage['logined'] === 'true') {
            var user = JSON.parse(localStorage['user'])
            $scope.username = user.username;
            $scope.logined = true;
            $scope.navbar = user.navbar;
        } else {
            if(localStorage['requireLogin'] === 'true'){
                localStorage['requireLogin'] = false
                $scope.logout();
                $scope.login()
            }
        }
        $scope.search = function(data) {
            toastr.success("正在搜索" + data + "...");
        }
        $scope.phone = "17612157384";
        $scope.email = "juny12324@gmail.com";

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
                size: "sm"
                    // windowClass: "animated flipInY"
            });
        }
    }


    function loginCtrl($scope, $uibModalInstance, $uibModal, commonSrv, $rootScope, $state, $location) {
        $scope.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        };
        $scope.modifyPass = function() {
            var oldPassword = $scope.oldPassword;
            var newPassword = $scope.newPassword;
            var confirmPassword = $scope.confirmPassword;

            commonSrv.modifyPass().save({
                "userId": localStorage["userId"],
                "oldPassword": oldPassword,
                "newPassword": newPassword,
                "confirmPassword": confirmPassword
            }).$promise.then(
                function(response) {
                    if (response.errorCode == 0) {
                        toastr.success('修改成功！请重新登录')
                        $uibModalInstance.close()
                        localStorage['requireLogin'] = true
                        localStorage['logined'] = false
                        $state.go("index.main", null, { reload: true })
                    } else {
                        toastr.error(response.message)
                    }
                },
                function() {
                    toastr.error("修改失败，请稍后再试")
                }
            )
        }
        $scope.login = function() {

            var previousRef = localStorage['previousRef']
            localStorage.removeItem('previousRef')

            if ($scope.user.id == "") {
                toastr.error("不能为空");
                return
            } else if ($scope.user.pass == "") {
                toastr.error("密码不能为空");
                return
            }

            commonSrv.login().save({
                "password": $scope.user.pass,
                "username": $scope.user.id

            }).$promise.then(
                function(response) {
                    console.log(response)
                    if (response.errorCode == 0) {
                        var params;
                        localStorage['userId'] = response.data.body.userId
                        localStorage['token'] = response.data.body.token
                        localStorage['userRole'] = response.data.body.role
                        $rootScope.$broadcast('login');

                        if (localStorage['userRole'] == 1) {
                            params = {
                                errorCode: "000",
                                message: "success",
                                username: $scope.user.id,
                                navbar: [{
                                    name: "我的课程",
                                    class: 'fa fa-table',
                                    url: 'index.studentCourse'
                                }, {
                                    name: "我的文件夹",
                                    class: 'fa fa-folder-open-o',
                                    url: 'index.files({id:' + localStorage['userId'] + '})'
                                }],
                                role: $scope.user.type //0:student;1:teacher;2:administrator
                            }
                        } else if (localStorage['userRole'] == 2) {
                            params = {
                                errorCode: "000",
                                message: "success",
                                username: $scope.user.id,
                                navbar: [{
                                    name: "我的课程",
                                    class: 'fa fa-table',
                                    url: 'index.teacherCourse'
                                }, {
                                    name: "我的文件夹",
                                    class: 'fa fa-folder-open-o',
                                    url: 'index.files({id:' + localStorage['userId'] + '})'
                                }],
                                role: $scope.user.type //0:student;1:teacher;2:administrator
                            }
                        } else if (localStorage['userRole'] == 3) {
                            params = {
                                errorCode: "000",
                                message: "success",
                                username: $scope.user.id,
                                navbar: [{
                                    name: "教师管理",
                                    class: 'fa fa-users',
                                    url: 'index.teacherManagement'
                                }, {
                                    name: "学期管理",
                                    class: 'fa fa-graduation-cap',
                                    url: 'index.semesterManagement'
                                }, {
                                    name: "课程管理",
                                    class: 'fa fa-calendar',
                                    url: 'index.courseManagement'
                                }, {
                                    name: "班级管理",
                                    class: 'fa fa-university',
                                    url: 'index.classManagement'
                                }],
                                role: $scope.user.type //0:student;1:teacher;2:administrator
                            }
                        }
                        localStorage['logined'] = true;
                        localStorage['user'] = JSON.stringify(params);
                        if(previousRef){
                            $location.path(previousRef)
                        }
                        $uibModalInstance.close(params);

                    } else {
                        toastr.error(response.message)
                    }
                },
                function(error) {
                    toastr.error("登录失败，请稍后再试")
                }
            );
            console.log($scope.user)
                //success 


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