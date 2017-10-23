(function() {
    'use strict';

    angular
        .module('phoenix')
        .service('commonSrv', commonSrv);

    commonSrv.$inject = ['reqUrl', '$resource'];

    function commonSrv(reqUrl, $resource) {
        this.resetPass = function() {
            return $resource(reqUrl + "/admin/password/resetion");
        }

        this.uploadImage = function() {
            return $resource(reqUrl + '/admin/course/experiment/piclib');
        }
    }
})();