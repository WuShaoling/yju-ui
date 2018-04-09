(function() {
    // 'use strict';

    angular
        .module('phoenix')
        .controller('notebookCtrl', notebookCtrl)
        .filter('trustAsResourceUrl', ['$sce', function($sce) {
            return function(val) {
                val = "http://" + val + "/tree?"
                return $sce.trustAsResourceUrl(val);
            };
        }])

    notebookCtrl.$inject = ['$scope', '$timeout', 'usSpinnerService', '$state', 'stuCourseSrv', '$stateParams', '$window', '$rootScope'];
    function notebookCtrl($scope, $timeout, usSpinnerService, $state, stuCourseSrv, $stateParams, $window, $rootScope) {

        $scope.notebookUrl = null

        var getNotebookInfo = function () {
            // Homework
            if ($stateParams.type === '0') {
                stuCourseSrv.getHwCloudwareInfo().get({
                    homeworkId: $stateParams.homeworkId,
                    studentId: $stateParams.studentId
                }).$promise.then(
                    function(response) {
                        if (response.errorCode === 0) {
                            // existed
                            $scope.notebookUrl = response.data.webSocket;

                        } else if (response.errorCode === 7 || response.errorCode === 47) {
                            // not existed
                            $scope.loading = false
                            getNewNotebookInfo();
                        } else {
                            toastr.error("获取作业信息失败，请重试")
                        }
                    },
                    function(error) {
                        toastr.error("获取作业信息失败，请重试")
                    })
            }

            // Experiment
            if ($stateParams.type === '1') {
                stuCourseSrv.getExCloudwareInfo().get({
                    experimentId: $stateParams.experimentId,
                    studentId: $stateParams.studentId
                }).$promise.then(
                    function(response) {
                        if (response.errorCode === 0) {
                            $scope.notebookUrl = response.data.webSocket;
                        } else if (response.errorCode === 35 || response.errorCode === 47) {
                            $scope.loading = false
                            getNewNotebookInfo();
                        } else {
                            toastr.error("获取实验信息失败，请重试")
                        }
                    },
                    function(error) {
                        toastr.error("获取实验信息失败，请重试")
                    })
            }
        }
        
        var getNewNotebookInfo = function () {
            // Homework
            if ($stateParams.type === '0') {
                var param = {
                    "homeworkId": $stateParams.homeworkId,
                    "studentId": $stateParams.studentId,
                    "cloudwareType": $stateParams.cloudwareType
                }
                stuCourseSrv.createHwCloudware().save(param).$promise.then(function(response) {
                    if (response.errorCode == 0) {
                        $scope.notebookUrl = response.data.webSocket
                        $scope.notebookServiceId = response.data.serviceId
                        $scope.notebookServiceName = response.data.serviceName
                    } else {
                        toastr.error(response.message);
                    }
                }, function(error) {
                    toastr.error("创建云件失败，请重试！");
                });
            }

            // Experiment
            if ($stateParams.type === '1') {
                var param = {
                    "experimentId": $stateParams.experimentId,
                    "studentId": $stateParams.studentId,
                    "cloudwareType": $stateParams.cloudwareType
                }
                stuCourseSrv.createExCloudware().save(param).$promise.then(function(response) {
                    if (response.errorCode == 0) {
                        $scope.notebookUrl = response.data.webSocket
                        $scope.notebookServiceId = response.data.serviceId
                        $scope.notebookServiceName = response.data.serviceName
                    } else {
                        toastr.error(response.message);
                    }
                }, function(error) {
                    toastr.error("创建云件失败，请重试！");
                });
            }
        }

        var deleteNotebook= function () {
            stuCourseSrv.deleteExCloudware().save({
                studentId: $stateParams.studentId,
                experimentId: $stateParams.experimentId
            })
        }


        var init = function () {
            getNotebookInfo();
            $window.onbeforeunload =  deleteNotebook;
        }
        $scope.$on('$destroy', function(){
            deleteNotebook();
        })

        init();
        

        $scope.isLogin = localStorage["logined"] === 'true';

        var startMoving;
        $scope.resizeMouseDown = function ($event) {
            startMoving = true;
        }
        $(document).mouseup(function () {
            startMoving = false;
        })
        $(document).mousemove(function (e) {
            if(startMoving) {
                var originalLeftWidth = $($('#leftNav')[0]).width();
                var currentDesignWidth = $($('#design')[0]).width();
                $($('#leftNav')[0]).width(e.clientX);
                $($('#design')[0]).width(currentDesignWidth - ($($('#leftNav')[0]).width() - originalLeftWidth));
                e.preventDefault();
            }
        })


        if(!$scope.isLogin){
            $scope.loading = false;
            return;
        } else {
            if($stateParams.studentId === 0){
                $state.go('index.main');
            }
        }


        $scope.notFirst = false;
        $scope.getCloudwareInfo = function() {
            switch ($stateParams.type) {
                case "0":
                    stuCourseSrv.getHwCloudwareInfo().get({
                        homeworkId: $stateParams.homeworkId,
                        studentId: $stateParams.studentId
                    }).$promise.then(
                        function(response) {
                            if (response.errorCode == 0) {
                                $scope.notFirst = true;
                                $scope.loading = false
                                $scope.cloudwareInfo = response.data;
                            } else if (response.errorCode == 7 || response.errorCode == 47) {

                                $scope.loading = false
                            } else {
                                toastr.error("获取作业云件信息失败，请重试")
                            }
                        },
                        function(error) {
                            toastr.error("获取作业云件信息失败，请重试")
                        })
                    break;
                case "1":
                    stuCourseSrv.getExCloudwareInfo().get({
                        experimentId: $stateParams.experimentId,
                        studentId: $stateParams.studentId
                    }).$promise.then(
                        function(response) {

                            if (response.errorCode == 0) {

                                $scope.notFirst = true;
                                $scope.loading = false
                                $scope.cloudwareInfo = response.data;
                            } else if (response.errorCode == 35 || response.errorCode == 47) {

                                $scope.loading = false
                            } else {
                                toastr.error("获取实验云件信息失败，请重试")
                            }
                        },
                        function(error) {
                            toastr.error("获取实验云件信息失败，请重试")
                        })
                    break;
                default:
                    break;
            }
        }

        $scope.getCloudwareInfo();
        $scope.loading = true;


        $scope.fullScreen = function() {
            var canvas = document.getElementById('theCanvas')
            var docElm = document.documentElement;
            if (docElm.requestFullscreen) {
                canvas.requestFullscreen();
            } else if (docElm.webkitRequestFullScreen) {
                canvas.webkitRequestFullScreen();
            }

        };

        $(window).bind('resize', function() {

            $timeout(function() {
                $('#leftNav').height($('#test').height());

            }, 500)
        });
    }



})();