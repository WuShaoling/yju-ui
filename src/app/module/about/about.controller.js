(function() {
    'use strict';

    angular
        .module('phoenix')
        .controller('aboutCtrl', aboutCtrl);

    aboutCtrl.$inject = ['$scope'];

    function aboutCtrl($scope) {

        $scope.phone = "123";

    }
})();