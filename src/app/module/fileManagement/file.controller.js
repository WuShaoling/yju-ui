(function() {
    'use strict';

    angular
        .module('phoenix')
        .controller('FileManagerCtrl', FileManagerCtrl);

    FileManagerCtrl.$inject = ['$scope', '$http', '$location', '$stateParams', 'fileManagementUrl'];

    function FileManagerCtrl($scope, $http, $location, $stateParams, fileManagementUrl) {
        $('#fileSystem').attr('src', fileManagementUrl + '/files#/?uid=' + $stateParams.id)
    }
})();