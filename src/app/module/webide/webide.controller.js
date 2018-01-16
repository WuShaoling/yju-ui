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
        $(function() {
            $('#container').jstree({
                'plugins' : [ 'types', 'dnd' ],
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
                    }
        
                },
              'core' : {
                  
                'data' : [
                  { "text" : "Root node", "children" : [
                      { "text" : "Child node 1.js","type":"js" },
                      { "text" : "svg " ,"type":"svg"},
                      { "text" : "html" ,"type":"html"},
                      { "text" : "css " ,"type":"css"},
                      { "text" : "img " ,"type":"img"},
                      { "text" : "Child node folder " ,"type":"","children":[
                        { "text" : "Child node " ,"type":"svg"},
                        { "text" : "Child node 2.html" ,"type":"html"},
                        { "text" : "Child node " ,"type":"css"},
                        { "text" : "Child node " ,"type":"img"},
                      ]}
                      
                      
                    ]
                  }
                ]
              }
            });
          });
          

          $timeout(function(){
            $("#codeFolder").css("position","absolute");

        
        })
 
     
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
        // CodeMirror.fromTextArea(document.getElementById("code"), {
        //     lineNumbers: true,
        //     mode: "javascript",
        //     theme:"3024-night",
        //     workTime:0,
        //   });
        $scope.cmModel = 'function findSequence(goal) {\nfunction find(start, history) {\nif (start == goal)\nreturn history;\nelse if (start > goal)\nreturn null;\nelse\nreturn find(start + 5, "(" + history + " + 5)") ||\nfind(start * 3, "(" + history + " * 3)");\n}\nreturn find(1, "1");\n}';

        $scope.currentfile = '';
        $scope.runResult = 'result result result result result result result result result result ';

        // $scope.treeOptions = {
        //     nodeChildren: "children",
        //     dirSelectable: false
        // }

        // todo: 动态生成
        $scope.dataForTheTree =
            [
                { "name" : "/directory1", context: 'I am hello1.java', "children" : [
                    { "name" : "/directory1/filename1", context: 'I am hello1.java'},
                    { "name" : "/directory1/filename2", context: 'I am hello2.java'},
                ]},
                { "name" : "/filename3", context: 'I am hello3.java'},
                { "name" : "/filename4", context: 'I am hello4.java',}
            ];

        // method
        $scope.renderContext = function(node) {
            console.log(node);
            filename = node.name;
            $scope.currentfile = filename;
            for (let i=0; i<$scope.fileList.length; i++) {
                if (filename === $scope.fileList[i].name) {
                    $scope.cmModel = $scope.fileList[i].context;
                }
            }
        };
     
        $scope.$watch('cmModel',function(newValue,oldValue, scope){
            console.log(newValue)
            // for(var i = 0;i < $scope.fileList.length; i++){
            //     if($scope.currentfile === $scope.fileList[i].name){
            //         $scope.fileList[i].context = newValue;
            //     }
            // }

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
