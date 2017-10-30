(function() {
    'use strict';

    angular
        .module('phoenix')
        .controller('studentDoHomeworkCtrl', studentDoHomeworkCtrl)
        .controller('uploadReportModalCtrl', uploadReportModalCtrl);

    studentDoHomeworkCtrl.$inject = ['$scope', '$uibModal', '$timeout', 'stuCourseSrv', '$stateParams'];
    uploadReportModalCtrl.$inject = ['$scope', '$uibModalInstance', '$timeout', 'reqUrl', 'stuCourseSrv', '$stateParams']

    function uploadReportModalCtrl($scope, $uibModalInstance, $timeout, reqUrl, stuCourseSrv, $stateParams) {
        $scope.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        }
        $scope.ok = function() {
            stuCourseSrv.submitHomework().save({
                "homeworkId": $stateParams.homeworkId,
                "homework_url": $scope.homeworkUrl,
                "studentId": $stateParams.studentId
            }).$promise.then(
                function(response) {
                    console.log(response)
                    if (response.errorCode == 0) {
                        toastr.success("提交成功")
                        $uibModalInstance.close();

                    } else {

                        toastr.error(response.message)
                    }
                },
                function(error) {
                    console.log(error)
                }
            )
        }
        $scope.chooseFile = function() {
            $('#report').trigger('click');
        }
        $scope.filename = "选择报告";
        $scope.submitted = false;
        $scope.homeworkFile = new FormData();

        $scope.getFile = function(file) {
            console.log(file);
            $scope.homeworkFile.append('file', file)
            $scope.filename = file.name;
            $scope.showBtn = true;
            $scope.$apply()
        };
        $scope.upload = function() {
            $.ajax({
                type: 'POST',
                url: reqUrl + '/admin/course/experiment/report',
                dataType: 'json',
                beforeSend: function(xhr) {
                    // xhr.setRequestHeader('access_token', '1504751421487');
                    xhr.setRequestHeader('Authorization', 'Bearer ' + (localStorage['token'] ? localStorage['token'] : ''));
                },
                processData: false, // Dont process the files
                contentType: false,
                data: $scope.homeworkFile,
                success: function(res) {
                    console.log(res)
                    if (res.errorCode == 0) {
                        toastr.success('上传成功');
                        $scope.homeworkUrl = res.data;
                        $scope.submitted = true;
                        $scope.$apply();
                    } else if (res.errorCode == 45) {
                        toastr.error("登录超时！");
                        $rootScope.$broadcast('ok', 0);
                    } else if (res.errorCode == 46) {
                        toastr.error("请重新登录！");
                        $rootScope.$broadcast('ok', 0)
                    } else {
                        toastr.error(res.message);
                    }
                }
            });
        }

        // $timeout(function() {
        //     // $('<input type="file" id="report" placeholder="" style="display:none"  class="form-control">').appendTo($('#choosefilebtn'));

        // })
    }


    function studentDoHomeworkCtrl($scope, $uibModal, $timeout, stuCourseSrv, $stateParams) {
        var vm = this;
        $scope.commitWork = function() {
            toastr.success("提交成功")
        }
        console.log($stateParams);
        stuCourseSrv.getHomeworkDetail().get({
            homeworkId: $stateParams.homeworkId
        }, function(response) {
            console.log(response);
            $scope.detail = response.data
            console.log($scope.detail)
        }, function(error) {
            console.log(error);
        })
        $scope.uploadReport = function() {
            var modalInstance = $uibModal.open({
                templateUrl: 'app/module/modal/uploadReportModal.html',
                controller: 'uploadReportModalCtrl'
            });


            modalInstance.rendered.then(function(result) {
                console.log(result);

            });
            modalInstance.result.then(function(result) {
                console.log(result);

            });
        }

    }
})();