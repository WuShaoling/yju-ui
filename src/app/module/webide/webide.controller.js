(function() {
    // 'use strict';

    angular
        .module('phoenix')
        .controller('webideCtrl', webideCtrl)
        .controller('webide_addfile_ctrl', webide_addfile_ctrl);

    webideCtrl.$inject = ['$scope', '$timeout', 'usSpinnerService', '$uibModal', '$state', 'stuCourseSrv', '$stateParams', 'cloudwareUrl', '$window', '$rootScope'];
    webide_addfile_ctrl.$inject = ['param', '$scope', '$uibModalInstance', 'classManagementSrv', '$stateParams'];

    function webide_addfile_ctrl(param, $scope, $uibModalInstance, classManagementSrv, $stateParams) {
        var isValidFile = function(str) { return /^\w+\.(java)$/.test(str); }
        var isValidDir = function(str) { return /^\w+$/.test(str); }

        if (param.type === 0) {
            $scope.title = "新建目录"
            $scope.tips = "新建文件夹名称"
        } else if (param.type === 1) {
            $scope.title = "新建文件"
            $scope.tips = "新建文件名称"
        }

        if (param.filePath.includes(".")) {
            var arr = param.filePath.split("/");
            delete arr[arr.length-1];
            $scope.filePath = arr.join("/");
        } else {
            if (param.filePath !== "/") {
                $scope.filePath = param.filePath + "/";
            } else {
                $scope.filePath = param.filePath;
            }
        }

        $scope.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        }

        $scope.sure = function () {
            if (param.type === 0) {
                if (!isValidDir($scope.newFile)) {
                    toastr.error("请输入正确的目录名")
                    return;
                }
            } else if (param.type === 1) {
                if (!isValidFile($scope.newFile)) {
                    toastr.error("请输入正确的文件名，文件名以.java结尾")
                    return;
                }
            }

            $uibModalInstance.close({
                data: {"text":$scope.newFile, "type":param.type?"file":"directory"}
            });
        }


    }

    function webideCtrl($scope, $timeout, usSpinnerService, $uibModal, $state, stuCourseSrv, $stateParams, cloudwareUrl, $window, $rootScope) {

        $scope.webidUrl = null;
        $scope.runResult = '';
        $scope.fileTreeData = null;
        $scope.currentFilePath = '/';
        $scope.currentFileId = null;
        $scope.currentFileData = '';
        $scope.display_rightbar = true;

        /* INIT FILE TREE */
        $(function () {
            $('#container').jstree({
                'types' : {
                    'directory' : {
                        'icon' : 'fa fa-folder-o'
                    },
                    'file' : {
                        'icon' : 'fa fa-file-code-o'
                    }
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
                    'data' : [{"text" : "/", "type": "directory", "children": [
                        {"text" : "Application.java", "type": "file", "data": "I am a java."}
                    ]}],
                },
                "plugins" : [
                    "unique",
                    "sort",
                    "wholerow",
                    "types",
                ],
            });

            $('#container').on("changed.jstree", function (e, data) {
                if (data.selected[0] !== undefined) {
                    $scope.currentFileId = data.selected[0];

                    var temp = "";
                    for (i=0; i<data.instance.get_path(data.selected[0]).length; i++) {
                        temp += data.instance.get_path(data.selected[0])[i];
                        if (i>0) {
                            temp += "/";
                        }
                    }
                    if (temp !== "/") {
                        temp = temp.substring(0, temp.length-1);
                    }
                    $scope.currentFilePath = temp;

                    $scope.currentFileData = data.instance.get_node(data.selected[0]).data;

                    $scope.currentFileType = data.instance.get_type(data.selected[0]);

                    $scope.$apply();
                }
            })
        })

        /* INIT WEB EDITOR */
        $scope.cmOption = {
            lineNumbers: true,
            indentWithTabs: true,
            styleActiveLine: true,
            matchBrackets: true,
            viewportMargin: 30,
            mode: 'java',
            theme:"default"
        };

        $scope.$watch('currentFileData',function(newValue, oldValue, scope){
            var node = $('#container').jstree('get_node', $scope.currentFileId);
            node.data = newValue
        });

        $scope.updateFileTree = function (newDate) {
            $('#container').jstree(true).settings.core.data = newDate;
            $('#container').jstree(true).refresh();
        }

        $scope.addFiles = function(type) {
            if ($scope.currentFileType === "file") {
                $scope.targetId = $('#container').jstree('get_parent', $scope.currentFileId);
            } else {
                $scope.targetId = $scope.currentFileId;
            }

            var obj = {
                filePath: $scope.currentFilePath,
                type: type
            }

            var modalInstance = $uibModal.open({
                size: "md",
                templateUrl: 'app/module/webide/modal/addfile.html',
                controller: webide_addfile_ctrl,
                resolve: {
                    param: function() { return angular.copy(obj); }
                }
            });

            modalInstance.result.then(function(result) {
                $('#container').jstree('create_node', $scope.targetId, result.data, "last", false, false);
            });
        }
        
        $scope.getFiles = function () {
            $.ajax({
                // url: $scope.webidUrl + "/srcfiles/" + $stateParams.studentId,
                url: "http://192.168.1.114:8080/srcfiles/4",
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
            var files = $('#container').jstree(true).get_json('#', {flat:true})
            $.ajax({
                // url: $scope.webidUrl + "/srcfiles"
                url: "http://192.168.1.114:8080/srcfiles",
                method: 'post',
                dataType: 'json',
                data: {
                    experimentId: 7,
                    // experimentId: $stateParams.experimentId,
                    files: files,
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
            $scope.runResult = 'I am a result ....'
            // $.ajax({
            //     // url: $scope.webidUrl + "/result/" + $stateParams.studentId,
            //     url: "http://192.168.1.114:8080/result/6",
            //     method: 'get',
            //     dataType: 'json',
            //     success: function (response) {
            //         console.log(response.result)
            //         $scope.runResult = response.result;
            //     },
            //     error: function (response) {
            //         console.log(response)
            //     }
            // })
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

        $scope.toggleRightBar = function () {
            $scope.display_rightbar = !$scope.display_rightbar;
        }



        $scope.test = function () {
            // $scope.getFiles();

            var file = [ {"text":"/", "type":"directory", "children": [
                {"text":"src", "type":"directory", "children":[
                    {"text":"hello_world_1.java", "type":"file", "data":"I am hello world 1 ."},
                    {"text":"hello_world_2.java", "type":"file", "data":"I am hello world 2 ."},
                    {"text":"hello_world_2.java", "type":"file", "data":"I am hello world 2 ."},
                    {"text":"hello_world_2.java", "type":"file", "data":"I am hello world 2 ."},
                    {"text":"hello_world_2.java", "type":"file", "data":"I am hello world 2 ."},
                    {"text":"hello_world_2.java", "type":"file", "data":"I am hello world 2 ."},
                    {"text":"hello_world_2.java", "type":"file", "data":"I am hello world 2 ."},
                    {"text":"hello_world_2.java", "type":"file", "data":"I am hello world 2 ."},
                    {"text":"hello_world_2.java", "type":"file", "data":"I am hello world 2 ."},
                    {"text":"hello_world_2.java", "type":"file", "data":"I am hello world 2 ."},
                    {"text":"hello_world_2.java", "type":"file", "data":"I am hello world 2 ."},
                    {"text":"hello_world_2.java", "type":"file", "data":"I am hello world 2 ."},
                    {"text":"hello_world_2.java", "type":"file", "data":"I am hello world 2 ."},
                    {"text":"hello_world_2.java", "type":"file", "data":"I am hello world 2 ."},
                    {"text":"hello_world_2.java", "type":"file", "data":"I am hello world 2 ."},
                    {"text":"hello_world_2.java", "type":"file", "data":"I am hello world 2 ."},
                    {"text":"hello_world_2.java", "type":"file", "data":"I am hello world 2 ."},
                    {"text":"hello_world_2.java", "type":"file", "data":"I am hello world 2 ."},
                    {"text":"hello_world_2.java", "type":"file", "data":"I am hello world 2 ."},
                    {"text":"hello_world_2.java", "type":"file", "data":"I am hello world 2 ."},
                    {"text":"hello_world_2.java", "type":"file", "data":"I am hello world 2 ."},
                    {"text":"hello_world_2.java", "type":"file", "data":"I am hello world 2 ."},
                    {"text":"hello_world_2.java", "type":"file", "data":"I am hello world 2 ."},
                    {"text":"hello_world_2.java", "type":"file", "data":"I am hello world 2 ."},
                    {"text":"hello_world_2.java", "type":"file", "data":"I am hello world 2 ."},
                    {"text":"hello_world_2.java", "type":"file", "data":"I am hello world 2 ."},
                    {"text":"hello_world_2.java", "type":"file", "data":"I am hello world 2 ."},
                    {"text":"hello_world_2.java", "type":"file", "data":"I am hello world 2 ."},
                    {"text":"hello_world_2.java", "type":"file", "data":"I am hello world 2 ."},
                    {"text":"hello_world_2.java", "type":"file", "data":"I am hello world 2 ."},
                    {"text":"hello_world_2.java", "type":"file", "data":"I am hello world 2 ."},
                    {"text":"hello_world_2.java", "type":"file", "data":"I am hello world 2 ."},
                    {"text":"hello_world_2.java", "type":"file", "data":"I am hello world 2 ."},
                    {"text":"hello_world_2.java", "type":"file", "data":"I am hello world 2 ."},
                ]},
                {"text":"dist", "type":"directory", "children":[]},
                {"text":"Application.java", "type":"file", "data":"I am application.java"},
            ]}
            ]
            $scope.updateFileTree(file)
        }

        var initRequest = function () {
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


        var init = function () {
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
            startMoving2 = false;
        })
        $(document).mousemove(function (e) {
            if(startMoving) {
                var originalLeftWidth = $($('#leftNav')[0]).width();
                var currentDesignWidth = $($('#editor')[0]).width();
                $($('#leftNav')[0]).width(e.clientX);
                $($('#editor')[0]).width(currentDesignWidth - ($($('#leftNav')[0]).width() - originalLeftWidth));
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
