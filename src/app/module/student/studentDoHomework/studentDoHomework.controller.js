(function() {
    'use strict';

    angular
        .module('phoenix')
        .controller('studentDoHomeworkCtrl', studentDoHomeworkCtrl);

    studentDoHomeworkCtrl.$inject = ['$scope'];

    function studentDoHomeworkCtrl($scope) {
        var vm = this;


        activate();

        ////////////////

        function activate() {}
    }
})();