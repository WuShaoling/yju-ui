(function() {
    'use strict';

    angular
        .module('phoenix')
        .controller('semesterManagementCtrl', semesterManagementCtrl);

    semesterManagementCtrl.$inject = ['$scope'];

    function semesterManagementCtrl($scope) {
        var vm = this;


        activate();

        ////////////////

        function activate() {}
    }
})();