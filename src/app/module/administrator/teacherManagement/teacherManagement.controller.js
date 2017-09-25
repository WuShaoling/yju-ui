(function() {
    'use strict';

    angular
        .module('phoenix')
        .controller('teacherManagementCtrl', teacherManagementCtrl);

    teacherManagementCtrl.$inject = ['$scope'];

    function teacherManagementCtrl($scope) {
        var vm = this;


        activate();

        ////////////////

        function activate() {}
    }
})();