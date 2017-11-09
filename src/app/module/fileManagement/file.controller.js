(function() {
    'use strict';

    angular
        .module('phoenix')
        .controller('FileManagerCtrl', FileManagerCtrl);

    FileManagerCtrl.$inject = ['$scope', '$http', '$location', '$stateParams'];

    function FileManagerCtrl($scope, $http, $location, $stateParams) {
        $('#fileSystem').attr('src', 'http://10.2.253.121:8090/files#/?uid=' + $stateParams.id)
    }
})();