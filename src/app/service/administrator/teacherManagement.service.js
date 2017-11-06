(function() {
    'use strict';

    angular
        .module('phoenix')
        .service('teacherManageSrv', teacherManageSrv);

    teacherManageSrv.$inject = ['reqUrl', '$resource'];

    function teacherManageSrv(reqUrl, $resource) {
        this.addNewTeacher = addNewTeacher;

        ////////////////

        function addNewTeacher() {
            return $resource(reqUrl + '/admin/teacher/creation');
        }
        this.getAllTeachers = function() {
            return $resource(reqUrl + '/admin/teacher/all');

        }

        this.editTeacher = function() {
            return $resource(reqUrl + "/admin/teacher/updation")
        }
        this.deleteTeacher = function() {
            return $resource(reqUrl + "/admin/teacher/deletion")
        }
        this.batchAddTeacher = function() {
            return $resource(reqUrl + '/admin/teacher/batchCreation')
        }


    }
})();