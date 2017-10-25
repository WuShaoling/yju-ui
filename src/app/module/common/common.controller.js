(function() {
    'use strict';

    angular
        .module('phoenix')
        .controller('commonCtrl', commonCtrl)
        .controller('loginCtrl', loginCtrl);

    commonCtrl.$inject = ['$scope', '$uibModal', '$state'];
    loginCtrl.$inject = ['$scope', '$uibModalInstance', '$uibModal', 'commonSrv'];

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
                size: "sm"
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


    function loginCtrl($scope, $uibModalInstance, $uibModal, commonSrv) {
        $scope.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        };
        $scope.modifyPass = function() {
            $uibModalInstance.close();

            var modalInstance = $uibModal.open({
                templateUrl: 'app/module/modal/modifyPassModal.html',
                controller: loginCtrl,
                size: "sm"
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
        $scope.login = function() {

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
                        if ($scope.user.type.label == "学生") {
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
                        } else if ($scope.user.type.label == "老师") {
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
                        } else if ($scope.user.type.label == "教务") {
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