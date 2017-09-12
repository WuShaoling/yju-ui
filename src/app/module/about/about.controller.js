(function() {
    'use strict';

    angular
        .module('opera')
        .controller('aboutCtrl', aboutCtrl);

    aboutCtrl.$inject = ['$scope'];

    function aboutCtrl($scope) {

        $scope.phone = "123";

    }
})();