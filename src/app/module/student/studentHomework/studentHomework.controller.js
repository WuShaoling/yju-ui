(function() {
    'use strict';

    angular
        .module('phoenix')
        .controller('studentHomeworkCtrl', studentHomeworkCtrl);

    studentHomeworkCtrl.$inject = ['$scope', '$state', 'stuCourseSrv', '$stateParams'];

    function studentHomeworkCtrl($scope, $state, stuCourseSrv, $stateParams) {
        $scope.doHomework = function(item) {
            $state.go('index.cloudware.studentDoHomework', { homeworkId: item.id });
        }
        stuCourseSrv.getAllHomework().get({
                classId: $stateParams.classId
            }, function(response) {
                console.log(response)
                $scope.courseContent = response.data;
                for (var i in $scope.courseContent) {
                    $scope.condition.push({
                        label: $scope.courseContent[i].moduleName,
                        value: $scope.courseContent[i].moduleName
                    })
                }

                $scope.q = $scope.condition[0].value
            },
            function(error) {
                console.log(error);
            })

        $scope.condition = [{
            label: "全部",
            value: ""
        }]


    }
})();