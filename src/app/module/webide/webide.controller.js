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


        /* INIT FILE TREE */
        $(function () {
            let data = [
                { "text" : "Root directory", "children" : [
                    { "text" : "helloWorld.js", "data": "I am code .....", "type":"js" },
                    { "text" : "helloWorld.svg ", "data": "I am code .....", "type":"svg"},
                    { "text" : "helloWorld.html", "data": "I am code .....", "type":"html"},
                    { "text" : "helloWorld.css ", "data": "I am code .....", "type":"css"},
                    { "text" : "helloWorld.img ", "data": "I am code .....", "type":"img"},
                    { "text" : "Child directory ", "children":[
                        { "text" : "helloWorld.svg", "data": "I am code .....", "type":"svg"},
                        { "text" : "helloWorld.html", "data": "I am code .....", "type":"html"},
                        { "text" : "helloWorld.css", "data": "I am code .....", "type":"css"},
                        { "text" : "helloWorld.img", "data": "I am code .....", "type":"img"},
                    ]}
                ]}
            ]

            $('#container').jstree({
                'types' : {
                    'default' : {
                        'icon' : 'fa fa-folder'
                    },
                    'html' : {
                        'icon' : 'fa fa-file-code-o'
                    },
                    'svg' : {
                        'icon' : 'fa fa-file-picture-o'
                    },
                    'css' : {
                        'icon' : 'fa fa-file-code-o'
                    },
                    'img' : {
                        'icon' : 'fa fa-file-image-o'
                    },
                    'js' : {
                        'icon' : 'fa fa-file-text-o'
                    },
                },
                'core' : {
                    "check_callback" : function (operation, node, parent, position, more) {
                        if(operation === "copy_node" || operation === "move_node") {
                            if(parent.id === "#") {
                                return false; // prevent moving a child above or below the root
                            }
                        }
                        return true; // allow everything else
                    },
                    'data' : data,
                },
                "plugins" : [
                    "unique",
                    "dnd",
                    "sort",
                    "wholerow",
                    "types",
                    // "contextmenu",  // todo bug 右键不生效
                    // "checkbox",     // todo 增加控件可控
                ]
            });

            $('#container').on("changed.jstree", function (e, data) {
                console.log('rain')
                let node = data.instance.get_node(data.selected[0])
                if (node !== undefined) {
                    $scope.currentFile = node.text;
                    $scope.currentCode = node.data;
                }
            })
        })
        // todo bugs    搜索不生效
        $scope.selectFile = function() {
            $("#container").jstree(true).search($scope.searchValue);
        }


        /* INIT WEB EDITOR */
        $scope.themes = ['default',"3024-day",'3024-night','neat','solarized','monokai']
        $scope.theme = $scope.themes[0];
        $scope.cmOption = {
            lineNumbers: true,
            indentWithTabs: true,
            lineWrapping: false,
            viewportMargin: 100,
            mode: 'javascript',
            theme:"default"
        };
        $scope.changeTheme = function(){
            $scope.cmOption.theme = $scope.theme
        }

        $scope.fileTreeData = null;
        $scope.currentFile = null;
        $scope.currentCode = 'function findSequence(goal) {\nfunction find(start, history) {\nif (start == goal)\nreturn history;\nelse if (start > goal)\nreturn null;\nelse\nreturn find(start + 5, "(" + history + " + 5)") ||\nfind(start * 3, "(" + history + " * 3)");\n}\nreturn find(1, "1");\n}';
        $scope.runResult = 'result result result result result result result result result result ';

        $scope.$watch('cmModel',function(newValue, oldValue, scope){
            console.log(newValue)
        });


        $scope.saveFiles = function () {
            console.log('rain1')
        }

        $scope.runFiles = function () {
            console.log('rain2')
        }

        $scope.test = function () {
            console.log('rain test')
            alert($scope.currentFile)
            // alert($scope.currentCode)
        }


        let init = function () {
            $timeout(function(){
                $("#codeFolder").css("position","absolute");
            })
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
    }



})();
