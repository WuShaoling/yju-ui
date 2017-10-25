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

        stuCourseSrv.getExperimentDetail().get({
                experimentId: $stateParams.experimentId
            }, function(response) {
                console.log(response);
                $scope.detail = response.data
                console.log($scope.detail)
                $scope.text = $scope.detail.experimentContent;
                if (!$scope.text) {
                    toastr.warning("实验内容为空")
                }
                $scope.html = converter.makeHtml($scope.text);
            }, function(error) {
                console.log(error);
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