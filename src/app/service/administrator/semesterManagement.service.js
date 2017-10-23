(function() {
    'use strict';

    angular
        .module('phoenix')
        .service('semesterSrv', semesterSrv);

    semesterSrv.$inject = ['reqUrl', '$resource'];

    function semesterSrv(reqUrl, $resource) {
        this.addNewSemester = function() {
            return $resource(reqUrl + '/admin/semester/creation')
        }
        this.getAllSemester = function() {
            return $resource(reqUrl + '/admin/semester/all')
        }
        this.editsemester = function() {
            return $resource(reqUrl + "/admin/semester/updation")
        }
        this.deletesemester = function() {
            return $resource(reqUrl + "/admin/semester/deletion")
        }
    }
})();