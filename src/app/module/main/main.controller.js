(function() {
    'use strict';

    angular
        .module('inspinia')
        .controller('MainController', MainController);

    MainController.$inject = ['$scope'];

    function MainController($scope) {
        $scope.phone = "17612157384";
        $scope.email = "juny12324@gmail.com";
    }
})();