(function() {
    'use strict';

    angular
        .module('phoenix')
        .controller('FileManagerCtrl', FileManagerCtrl);

    FileManagerCtrl.$inject = ['$scope', '$http', '$location', '$stateParams'];

    function FileManagerCtrl($scope, $http, $location, $stateParams) {
        $('#fileSystem').attr('src', 'http://117.50.1.134:8090/files#/?uid=' + $stateParams.id)
    }
})();