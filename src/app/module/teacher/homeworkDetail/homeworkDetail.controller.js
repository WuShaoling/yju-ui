(function() {
    'use strict';

    angular
        .module('phoenix')
        .controller('homeworkDetailCtrl', homeworkDetailCtrl);

    homeworkDetailCtrl.$inject = ['$scope', '$uibModal', 'teacherCourseSrv', '$stateParams'];

    function homeworkDetailCtrl($scope, $uibModal, teacherCourseSrv, $stateParams) {
        $scope.grade = function() {
            var modalInstance = $uibModal.open({
                // size: "",
                templateUrl: 'app/module/modal/gradeModal.html',
                controller: 'gradeModalCtrl'

            });
            modalInstance.result.then(function(result) {

            });
        }

        teacherCourseSrv.getModuleHw().get({ moduleId: $stateParams.moduleId },
            function(response) {
                console.log(response);
                $scope.courseContent = response.data.homeworks;
                for (var i in $scope.courseContent) {
                    $scope.condition.push({
                        label: $scope.courseContent[i].homeworkName,
                        value: $scope.courseContent[i].homeworkName
                    })
                }

                $scope.q = $scope.condition[0].value
                $scope.p = $scope.condition1[0].value

            },
            function(error) {
                console.log(error)
            })
        $scope.courseContent = [];

        $scope.condition = [{
            label: "全部",
            value: ""
        }]

        $scope.condition1 = [{
            label: "全部",
            value: -1
        }, {
            label: "已提交",
            value: 1
        }, {
            label: "未提交",
            value: 0
        }]
        $scope.change = function() {
            console.log($scope.p);
            console.log($scope.q);

        }

        $scope.filterFunc = function(e) {
            // console.log(e);
            if ($scope.p == -1) { return e } else { return e.completed == $scope.p }

        }

    }
})();