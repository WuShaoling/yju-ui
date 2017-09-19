(function() {
    'use strict';

    angular
        .module('phoenix')
        .controller('courseDetail1Ctrl', courseDetail1Ctrl);

    courseDetail1Ctrl.$inject = ['$scope'];

    function courseDetail1Ctrl($scope) {
        var vm = this;


        activate();

        ////////////////

        function activate() {}
    }
})();