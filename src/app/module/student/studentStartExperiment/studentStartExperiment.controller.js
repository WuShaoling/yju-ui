(function() {
    'use strict';

    angular
        .module('phoenix')
        .controller('studentStartExperimentCtrl', studentStartExperimentCtrl);

    studentStartExperimentCtrl.$inject = ['$scope', '$timeout', 'stuCourseSrv', '$stateParams'];

    function studentStartExperimentCtrl($scope, $timeout, stuCourseSrv, $stateParams) {
        var converter = new showdown.Converter();
        converter.setOption('tasklists', true);
        converter.setOption('tables', true);

        stuCourseSrv.getLastExperiment().get({
                studentId: localStorage['userId']
            }, function (response) {
                if(response.errorCode == 0){
                    //如果上次实验存在且与本次实验id不一致，提醒用户删除上一次实验容器
                    if(response.data.lastExperimentId != 0 &&
                        response.data.lastExperimentId != $stateParams.experimentId){
                        swal({
                                title: "注意",
                                text: "上一次实验【"+response.data.lastModuleName+"/"+response.data.lastExperimentName+"】还未关闭。\n目前一个用户仅能同时打开1个实验容器\n是否关闭上一个实验容器？",
                                type: "warning",
                                showCancelButton: true,
                                confirmButtonColor: "#DD6B55",
                                confirmButtonText: "确定",
                                closeOnConfirm: true,
                                cancelButtonText: "取消",
                                closeOnCancel: true
                            },
                            function(isConfirm) {
                                if (isConfirm) {
                                    stuCourseSrv.deleteExCloudware().save({
                                        studentId: localStorage['userId'],
                                        experimentId: response.data.lastExperimentId
                                    }, function(response) {
                                        if(response.errorCode == 0) {
                                            toastr.success("删除上次实验成功")
                                        }
                                    })
                                } else {
                                    history.go(-1)
                                }
                            });
                    }
                }
            })

        stuCourseSrv.getExperimentDetail().get({
                experimentId: $stateParams.experimentId
            }, function(response) {
                console.log(response);
                if(response.errorCode == 0) {
                    $scope.detail = response.data
                    console.log($scope.detail)
                    $scope.text = $scope.detail.experimentContent;
                    if (!$scope.text) {
                        toastr.warning("实验内容为空")
                    }
                    $scope.html = converter.makeHtml($scope.text);
                } else {
                    toastr.error(response.message)
                }
            }, function(error) {
                toastr.error("获取实验内容失败，请稍后重试")
            })
            // $.get("app/module/teacher/teacherCourse/test.md", function(result) {
            //     // console.log(result)
            //     if (result == null) {
            //         return
            //     }
            //     $scope.text = result;
            //     $scope.html = converter.makeHtml($scope.text);
            //     // $timeout(function() {
            //     //     console.log($('#ht').height())
            //     //     $('#or').height($('#ht').height());
            //     // })

        //     // console.log(result.label_type)
        // });
    }
})();