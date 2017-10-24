(function() {
    'use strict';

    angular
        .module('phoenix')
        .service('classManagementSrv', classManagementSrv);

    classManagementSrv.$inject = ['reqUrl', '$resource'];

    function classManagementSrv(reqUrl, $resource) {

        this.addclass = function() {
            return $resource(reqUrl + '/admin/class/creation')
        }

        this.getAllclass = function() {
            return $resource(reqUrl + '/admin/class/all');
        }
        this.editclass = function() {
            return $resource(reqUrl + "/admin/class/updation")
        }
        this.deleteclass = function() {
            return $resource(reqUrl + "/admin/class/deletion")
        }

        this.getClassStudent = function() {
            return $resource(reqUrl + "/admin/class/:classId/students/all", {
                classId: "@classId"
            })
        }

        this.addStudent = function() {
            return $resource(reqUrl + "/admin/class/student/creation")
        }

        this.editStudent = function() {
            return $resource(reqUrl + "/admin/class/student/updation")
        }
        this.deleteStudent = function() {
            return $resource(reqUrl + "/admin/class/student/deletion")
        }

        this.getHomework = function() {
            return $resource(reqUrl + '/admin/class/:classId/homework', {
                classId: "@classId"
            })
        }
        this.addHomework = function() {
            return $resource(reqUrl + '/admin/class/homework/creation')
        }
        this.deleteHomework = function() {
            return $resource(reqUrl + "/admin/class/homework/deletion")
        }


    }
})();