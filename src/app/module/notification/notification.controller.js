(function() {
    'use strict';

    angular
        .module('phoenix')
        .controller('notificationCtrl', notificationCtrl);

    notificationCtrl.$inject = ['$scope'];

    function notificationCtrl($scope) {
        var vm = this;
        $scope.notifications = JSON.parse(localStorage['notifications'])
        console.log($scope.notifications)
        activate();
        if (localStorage['currentRole'] == 0) {
            $scope.show = true
        }
        ////////////////

        function activate() {}
    }
})();