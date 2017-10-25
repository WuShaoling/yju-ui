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
        this.uploadMarkdown = function() {
            return $resource(reqUrl + '/admin/course/experiment/markdown');
        }

        this.login = function() {
            return $resource(reqUrl + '/auth/login');
        }

        this.startEx = function() {
            return $resource("http://192.168.1.128:8080/services")
        }

        this.getHotCourses = function() {
            return $resource(reqUrl + '/common/hotCourses/all')
        }
    }
})();