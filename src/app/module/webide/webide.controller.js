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

        $scope.webidUrl = null;

        /* INIT FILE TREE */
        $(function () {
            $('#container').jstree({
                'types' : {
                    'default' : {
                        'icon' : 'fa fa-folder'
                    },
                    'html' : {
                        'icon' : 'fa fa-file-code-o'
                    },
                    'java' : {
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
                    'data' : [{"text" : "Application.java", "type": "java", "data": "I am a java."}],
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

        $scope.updateFileTree = function (newDate) {
            $('#container').jstree(true).settings.core.data = newDate;
            $('#container').jstree(true).refresh();
        }

        $scope.getFiles = function () {
            console.log('rain33')
            $.ajax({
                // url: $scope.webidUrl + "srcfiles/" + $stateParams.studentId,
                url: "http://192.168.1.118:8080/srcfiles/4",
                method: 'get',
                dataType: 'json',
                success: function (response) {
                    $scope.updateFileTree(response.files)
                },
                error: function (response) {
                    console.log(response)
                }
            })

        }

        $scope.saveFiles = function () {
            console.log('rain1')
            $.ajax({
                // url: $scope.webidUrl + "srcfiles"
                url: "http://192.168.1.118:8080/srcfiles",
                method: 'post',
                dataType: 'json',
                data: {
                    experimentId: $stateParams.experimentId,
                    files: [{"text":"/dir","children":[{"text":"/dir/ClassB.java","data":"package dir;public class ClassB {public ClassB(){System.out.println(\"this is ClassB\");}}"}]},{"text":"/Application2.java","data":"import dir.ClassB;public class Application {public static void main(String[] args){ClassA a = new ClassA();ClassB b = new ClassB();System.out.println(\"hello world from main！\");}}"},{"text":"/ClassA.java","data":"public class ClassA {public ClassA(){System.out.println(\"this is ClassA\");}}"}]
                },
                success: function (response) {
                    console.log(response)
                },
                error: function (response) {
                    console.log(response)
                }
            })
        }

        $scope.runFiles = function () {
            console.log('rain2')
            // todo run program & get result
            $.ajax({
                // url: $scope.webidUrl + "srcfiles/" + $stateParams.studentId,
                url: "http://syyxm7svz.cloudwarehub.com:84/srcfiles/4",
                method: 'post',
                dataType: 'json',
                success: function (response) {
                    console.log(response)
                },
                error: function (response) {
                    console.log(response)
                }
            })
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

        $scope.test = function () {
            console.log('rain test')
            // alert($scope.currentFile)
            // alert($scope.currentCode)

            // $scope.getFiles();
            $scope.saveFiles();


            // let data = [{"text":"/dir","children":[{"text":"/dir/ClassB.java","data":"package dir;public class ClassB {public ClassB(){System.out.println(\"this is ClassB\");}}"}]},{"text":"/Application.java","data":"import dir.ClassB;public class Application {public static void main(String[] args){ClassA a = new ClassA();ClassB b = new ClassB();System.out.println(\"hello world from main！\");}}"},{"text":"/ClassA.java","data":"public class ClassA {public ClassA(){System.out.println(\"this is ClassA\");}}"}]
            // $scope.updateFileTree(data)
        }

        let initRequest = function () {
            $.ajax({
                // url: cloudwareUrl + '/services',
                url: 'http://192.168.1.118:8080' + '/services',    // todo test to delete
                method: 'post',
                data: {
                    'secret': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJiYXIiLCJpYXQiOjE1MDU4MTM0NTd9.Ftw1yHeUrqdNvymFZcIpuEoS0RHBFZqu4MfUZON9Zm0',
                    cloudwareType: $stateParams.cloudwareType,
                    userId: $stateParams.studentId
                },
                dataType: 'json',
                success: function (response) {
                    $scope.webidUrl = response.ws
                    $scope.webideServiceId = response.service_id
                    $scope.webideServiceName = response.service_name

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

        let init = function () {
            // initRequest()

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
