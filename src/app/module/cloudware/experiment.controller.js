(function() {
    'use strict';

    angular
        .module('phoenix')
        .controller('experimentCtrl', experimentCtrl);

    experimentCtrl.$inject = ['$scope'];

    function experimentCtrl($scope) {
        var vm = this;


        activate();

        ////////////////

        function activate() {}
    }
})();