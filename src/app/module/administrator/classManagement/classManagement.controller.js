(function() {
    'use strict';

    angular
        .module('phoenix')
        .controller('classManagementCtrl', classManagementCtrl);

    classManagementCtrl.$inject = ['$scope'];

    function classManagementCtrl($scope) {
        var vm = this;

        $scope.classList = []
    }
})();