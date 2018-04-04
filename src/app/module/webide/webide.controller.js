(function() {
    // 'use strict';

    angular
        .module('phoenix')
        .controller('webideCtrl', webideCtrl)
        .filter('trustWebideUrl', ['$sce', function($sce) {
            return function(val) {
                val = val + "/"
                return $sce.trustAsResourceUrl(val);
            };
        }]);

    webideCtrl.$inject = ['$scope', '$timeout', 'usSpinnerService', '$uibModal', '$state', 'stuCourseSrv', '$stateParams', 'cloudwareUrl', '$window', '$rootScope'];

    function webideCtrl($scope, $timeout, usSpinnerService, $uibModal, $state, stuCourseSrv, $stateParams, cloudwareUrl, $window, $rootScope) {

        $scope.webideBaseUrl = "http://api.cloudwarehub.com:8080/ws/";

        $scope.webideServiceUrl = null;
        $scope.webideServiceId = null;
        $scope.webideServiceName = null;

        $scope.display_right_bar = true;
        $scope.md_full_screen = false;

        $scope.loaded = false;

        $scope.toggle_right_bar = function () {
            $scope.display_right_bar = !$scope.display_right_bar;
        }

        $scope.full_md_screen = function () {
            $scope.md_full_screen = !$scope.md_full_screen;

            if ($scope.md_full_screen) {
                angular.element('#resizeDiv').hide();
                angular.element('#leftNav').hide();
                angular.element('#design').width("100%");
            } else {
                angular.element('#resizeDiv').show();
                angular.element('#leftNav').show();
                angular.element('#design').width("66.5%");
                angular.element('#leftNav').width("33%");
            }
        }

        var initRequest = function () {
            $.ajax({
                url: cloudwareUrl + '/services',
                method: 'post',
                data: {
                    'secret': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJiYXIiLCJpYXQiOjE1MDU4MTM0NTd9.Ftw1yHeUrqdNvymFZcIpuEoS0RHBFZqu4MfUZON9Zm0',
                    cloudwareType: $stateParams.cloudwareType,
                    userId: $stateParams.studentId
                },
                dataType: 'json',
                success: function (response) {
                    $scope.loaded = true;
                    $scope.webideServiceUrl = response.ws;
                    $scope.webideServiceId = response.service_id;
                    $scope.webideServiceName = response.service_name;

                    // Homework
                    if ($stateParams.type === '0') {
                        var webIdeUrl = $scope.webideBaseUrl + $stateParams.studentId+ '_' + $stateParams.homeworkId + "/?wsUrl=" +  $scope.webideServiceUrl
                        console.log('webIdeUrl: ' + webIdeUrl)
                        createIframe(webIdeUrl)

                        var param = {
                            "homeworkId": $stateParams.homeworkId,
                            "pulsarId": response.pulsar_id,
                            "serviceId": response.service_id,
                            "serviceName": response.service_name,
                            "studentId": $stateParams.studentId,
                            "webSocket": response.ws
                        }
                        stuCourseSrv.createHwCloudware().save(param).$promise.then(function(response) {
                        }, function(error) {
                            console.log(error);
                        });
                    }

                    // Experiment
                    if ($stateParams.type === '1') {
                        var webIdeUrl = $scope.webideBaseUrl + $stateParams.studentId+ '_' + $stateParams.experimentId + "/?wsUrl=" +  $scope.webideServiceUrl
                        console.log('webIdeUrl: ' + webIdeUrl)
                        createIframe(webIdeUrl)

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

        var deleteWebide= function () {
            $.ajax({
                url: cloudwareUrl + '/homeworks',
                method: 'post',
                data: {
                    'secret': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJiYXIiLCJpYXQiOjE1MDU4MTM0NTd9.Ftw1yHeUrqdNvymFZcIpuEoS0RHBFZqu4MfUZON9Zm0',
                    serviceName: $scope.webideServiceName,
                    serviceId: $scope.webideServiceId,
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


        var createIframe = function (url) {
            var oldIframe = document.getElementById("iframe");
            if (oldIframe != null) {
                document.getElementById("design").removeChild(oldIframe);
            }

            var iframe = document.createElement('iframe');
            iframe.id = "iframe";
            iframe.src = url;
            iframe.style = "height:100%;width:100%";
            document.getElementById("design").appendChild(iframe);
        }


        var init = function () {
            // 创建loading iframe
            var loadingUrl = "http://www.x-lab.ac:13004/";
            createIframe(loadingUrl);

            // 请求webide容器
            if (!$scope.loaded) {
                console.log('Requesting...')
                initRequest()
            }
        }
        init()

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

        // 退出时删除容器
        $scope.$on('$destroy', function(){
            deleteWebide();
        })
        $window.onbeforeunload =  deleteWebide;
    }



})();
