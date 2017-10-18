(function() {
    'use strict';

    angular
        .module('phoenix')
        .controller('checkHomeworkCtrl', checkHomeworkCtrl)
        .controller('checkReportModalCtrl', checkReportModalCtrl)
        .controller('gradeModalCtrl', gradeModalCtrl);

    checkHomeworkCtrl.$inject = ['$scope', '$uibModal', '$stateParams', 'teacherCourseSrv'];
    checkReportModalCtrl.$inject = ['$scope', '$uibModalInstance', '$timeout']
    gradeModalCtrl.$inject = ['$scope', '$uibModalInstance', '$timeout']

    function gradeModalCtrl($scope, $uibModalInstance, $timeout) {
        $scope.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        }
        $scope.ok = function() {

            $uibModalInstance.close();
        }
    }

    function checkReportModalCtrl($scope, $uibModalInstance, $timeout) {
        $scope.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        }
        $scope.ok = function() {

            $uibModalInstance.close();
        }
    }

    function checkHomeworkCtrl($scope, $uibModal, $stateParams, teacherCourseSrv) {
        var vm = this;


        teacherCourseSrv.getHwDetail().get({
                id: $stateParams.id
            },
            function(response) {
                console.log(response);
            },
            function(error) {
                console.log(error)
            })
        $scope.grade = function() {
            var modalInstance = $uibModal.open({
                // size: "",
                templateUrl: 'app/module/modal/gradeModal.html',
                controller: 'gradeModalCtrl'
            });


            modalInstance.result.then(function(result) {

            });
        }
        $scope.checkReport = function() {
            var modalInstance = $uibModal.open({
                size: 'lg',
                templateUrl: 'app/module/modal/checkReportModal.html',
                controller: 'checkReportModalCtrl'
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