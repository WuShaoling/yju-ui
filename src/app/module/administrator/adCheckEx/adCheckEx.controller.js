(function() {
    'use strict';

    angular
        .module('phoenix')
        .controller('adCheckExCtrl', adCheckExCtrl);

    adCheckExCtrl.$inject = ['$scope', '$timeout'];

    function adCheckExCtrl($scope, $timeout) {
        var vm = this;
        $scope.leftControl = true;
        $scope.rightControl = false;

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

        activate();

        ////////////////

        function activate() {}
    }
})();