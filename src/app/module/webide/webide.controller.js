(function() {
    // 'use strict';

    angular
        .module('phoenix')
        .controller('webideCtrl', webideCtrl)
        .filter('showFilename', [function() {
                return function(value) {
                    var array = value.split("/");
                    var filename = array[array.length-1]
                    return filename;
                };
            }]);

    webideCtrl.$inject = ['$scope', '$timeout', 'usSpinnerService', '$state', 'stuCourseSrv', '$stateParams', 'cloudwareUrl', '$window', '$rootScope'];
    function webideCtrl($scope, $timeout, usSpinnerService, $state, stuCourseSrv, $stateParams, cloudwareUrl, $window, $rootScope) {

        $scope.cmOption = {
            lineNumbers: true,
            indentWithTabs: true,
            lineWrapping: true,
            viewportMargin: 30,
            mode: 'javascript'
        };

        $scope.cmModel = 'function myScript(){return 100;}\n';

        $scope.currentfile = '';
        $scope.runResult = 'result result result result result result result result result result ';

        $scope.treeOptions = {
            nodeChildren: "children",
            dirSelectable: false
        }

        $scope.dataForTheTree =
            [
                { "name" : "/directory1", "children" : [
                    { "name" : "/directory1/filename1", context: 'I am hello1.java'},
                    { "name" : "/directory1/filename2", context: 'I am hello2.java'},
                ]},
                { "name" : "/filename3", context: 'I am hello3.java'},
                { "name" : "/filename4", context: 'I am hello4.java'}
            ];

        // method
        $scope.renderContext = function(node) {
            $scope.currentfile = node.name;
            $scope.cmModel = node.context;
        };

        let updateContext = function (obj, context) {
            for (let i=0; i<obj.length; i++) {
                if (obj[i].children === undefined) {
                    if (obj[i].name === $scope.currentfile) {
                        obj[i].context = context;
                    }
                } else {
                    updateContext(obj[i].children, context);
                }
            }
        };

        $scope.$watch('cmModel',function(newValue,oldValue, scope){
            updateContext($scope.dataForTheTree, newValue)
        });

        $scope.addFile = function () {
            console.log('rain1')
        }

        $scope.deleteFile = function () {
            console.log('rain2')
        }

        $scope.runProgram = function () {
            console.log('rain3')
        }

        var init = function () {
            console.log('rain0')
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
