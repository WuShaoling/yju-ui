(function() {
    'use strict';

    angular
        .module('phoenix')
        .controller('studentDoHomeworkCtrl', studentDoHomeworkCtrl)
        .controller('uploadReportModalCtrl', uploadReportModalCtrl);

    studentDoHomeworkCtrl.$inject = ['$scope', '$uibModal', '$timeout'];
    uploadReportModalCtrl.$inject = ['$scope', '$uibModalInstance', '$timeout']

    function uploadReportModalCtrl($scope, $uibModalInstance, $timeout) {
        $scope.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        }
        $scope.ok = function() {

            $uibModalInstance.close();
        }
        $scope.chooseFile = function() {
            $('#report').trigger('click');
        }
        $scope.filename = "选择报告";
        $scope.getFile = function(file) {
            console.log(file);
            $scope.filename = file.name;
            $scope.showBtn = true;
            $scope.$apply()
        };
        $scope.upload = function() {
            toastr.success("上传成功,不要忘记提交！")
        }

        // $timeout(function() {
        //     // $('<input type="file" id="report" placeholder="" style="display:none"  class="form-control">').appendTo($('#choosefilebtn'));

        // })
    }


    function studentDoHomeworkCtrl($scope, $uibModal) {
        var vm = this;
        $scope.commitWork = function() {
            toastr.success("提交成功")
        }
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