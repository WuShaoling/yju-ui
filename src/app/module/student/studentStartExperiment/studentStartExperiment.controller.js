(function() {
    'use strict';

    angular
        .module('phoenix')
        .controller('studentStartExperimentCtrl', studentStartExperimentCtrl);

    studentStartExperimentCtrl.$inject = ['$scope'];

    function studentStartExperimentCtrl($scope) {
        var converter = new showdown.Converter();
        converter.setOption('tasklists', true);
        converter.setOption('tables', true);
        $.get("app/module/teacher/teacherCourse/test.md", function(result) {
            // console.log(result)
            if (result == null) {
                return
            }
            $scope.text = result;
            $scope.html = converter.makeHtml($scope.text);
            $timeout(function() {
                console.log($('#ht').height())
                $('#or').height($('#ht').height());
            })

            // console.log(result.label_type)

        });
    }
})();