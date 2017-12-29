(function() {
    // 'use strict';

    angular
        .module('phoenix')
        .controller('notebookCtrl', notebookCtrl)
        .filter('trustAsResourceUrl', ['$sce', function($sce) {
            return function(val) {
                val = "http://" + val + "/tree?"
                // console.log(val)
                // console.log($sce.trustAsResourceUrl(val))
                return $sce.trustAsResourceUrl(val);
            };
        }])

    notebookCtrl.$inject = ['$scope', '$timeout', 'usSpinnerService', '$state', 'stuCourseSrv', '$stateParams', 'cloudwareUrl', '$window', '$rootScope'];
    function notebookCtrl($scope, $timeout, usSpinnerService, $state, stuCourseSrv, $stateParams, cloudwareUrl, $window, $rootScope) {

        $scope.notebookUrl = null
        $scope.firstload = true

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
                            $scope.firstload = false
                            $scope.notebookUrl = response.data.webSocket;
                        } else if (response.errorCode === 7 || response.errorCode === 47) {
                            // not existed
                            $scope.loading = false
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
                            $scope.firstload = false
                            $scope.notebookUrl = response.data.webSocket;
                        } else if (response.errorCode === 35 || response.errorCode === 47) {
                            $scope.loading = false
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
            // get notebook info
            $.ajax({
                url: cloudwareUrl + '/services',
                method: 'post',
                data: {
                    'secret': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJiYXIiLCJpYXQiOjE1MDU4MTM0NTd9.Ftw1yHeUrqdNvymFZcIpuEoS0RHBFZqu4MfUZON9Zm0',
                    cloudware_type: $stateParams.cloudwareType,
                    user_id: $stateParams.studentId
                },
                dataType: 'json',
                success: function (response) {
                    $scope.notebookUrl = response.ws
                    $scope.notebookServiceId = response.service_id
                    $scope.notebookServiceName = response.service_name

                    // store note book to db
                    // Homework
                    if ($stateParams.type === '0') {
                        var param = {
                            "homeworkId": $stateParams.homeworkId,
                            "pulsarId": response.pulsar_id,
                            "serviceId": response.service_id,
                            "serviceName": response.service_name,
                            "studentId": $stateParams.studentId,
                            "webSocket": response.ws
                        }
                        stuCourseSrv.createHwCloudware().save(param).$promise.then(function(response) {
                            // console.log(response)
                        }, function(error) {
                            console.log(error);
                        });
                    }

                    // Experiment
                    if ($stateParams.type === '1') {
                        var param = {
                            "experimentId": $stateParams.experimentId,
                            "pulsarId": response.pulsar_id,
                            "serviceId": response.service_id,
                            "serviceName": response.service_name,
                            "studentId": $stateParams.studentId,
                            "webSocket": response.ws
                        }
                        stuCourseSrv.createExCloudware().save(param).$promise.then(function(response) {
                            // console.log(response)
                        }, function(error) {
                            console.log(error);
                        });
                    }
                },
                error: function (response) {
                    console.log(response)
                }
            });
        }

        var deleteNotebook= function () {
            $.ajax({
                url: cloudwareUrl + '/homeworks',
                method: 'post',
                data: {
                    'secret': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJiYXIiLCJpYXQiOjE1MDU4MTM0NTd9.Ftw1yHeUrqdNvymFZcIpuEoS0RHBFZqu4MfUZON9Zm0',
                    service_name: $scope.notebookServiceName,
                    service_id: $scope.notebookServiceId,
                },
                dataType: 'json',
                success: function (response) {
                },
                error: function (response) {
                    console.log(response)
                }
            })

            stuCourseSrv.deleteExCloudware().save({
                studentId: $stateParams.studentId,
                experimentId: $stateParams.experimentId
            })
        }


        var init = function () {
            getNotebookInfo();

            // todo: 同步等待上个函数结果。
            if ($scope.firstload === true) {
                getNewNotebookInfo();
            }

            // todo: 离开页面事件生效？
            $window.onbeforeunload =  $scope.deleteNotebook;
        }

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

        $scope.fullScreen = function() {
            // $('#design').css({ 'position': 'absolute', 'top': '0' });
            // $('body').height($(window).height());
            // $('body').width($(window).width());
            // $('#design').height($(window).height());
            // $('#design').width($(window).width());
            var canvas = document.getElementById('theCanvas')
            var docElm = document.documentElement;
            if (docElm.requestFullscreen) {
                canvas.requestFullscreen();
            } else if (docElm.webkitRequestFullScreen) {
                canvas.webkitRequestFullScreen();
            }

        };


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