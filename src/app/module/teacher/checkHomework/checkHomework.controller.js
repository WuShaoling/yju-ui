(function() {
    'use strict';

    angular
        .module('phoenix')
        .controller('checkHomeworkCtrl', checkHomeworkCtrl);

    checkHomeworkCtrl.$inject = ['$scope'];

    function checkHomeworkCtrl($scope) {
        var vm = this;


        activate();

        ////////////////

        function activate() {}
    }
})();