(function() {
    'use strict';

    angular
        .module('phoenix')
        .service('webideSrv', webideSrv);

    webideSrv.$inject = ['cloudwareUrl', '$resource'];

    function webideSrv(cloudwareUrl, $resource) {
        this.getFiles = function() {
            return $resource(cloudwareUrl + "/getFiles");
        }

        this.runProgram = function() {
            return $resource(cloudwareUrl + '/runProgram');
        }

        this.addFile = function () {
            return $resource(cloudwareUrl + '/addFile');
        }

        this.deleteFile = function () {
            return $resource(cloudwareUrl + '/deleteFile');
        }
    }
})();