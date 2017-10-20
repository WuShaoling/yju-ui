(function() {
    'use strict';

    angular
        .module('phoenix')
        .controller('notificationCtrl', notificationCtrl);

    notificationCtrl.$inject = ['$scope'];

    function notificationCtrl($scope) {
        var vm = this;


        activate();

        ////////////////

        function activate() {}
    }
})();