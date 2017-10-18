(function() {
    'use strict';

    angular
        .module('phoenix')
        .service('teacherCourseSrv', teacherCourseSrv);

    teacherCourseSrv.$inject = ['reqUrl', '$resource'];

    function teacherCourseSrv(reqUrl, $resource) {

        this.getAllCourse = function() {
            return $resource(reqUrl + "/teacher/data/:teacherId.json", {
                teacherId: "@teacherId"
            })
        }
        this.getModuleHw = function() {
            return $resource(reqUrl + "/teacher/data/:moduleId.json", {
                moduleId: "@moduleId"
            })
        }

        this.getHwDetail = function() {
            return $resource(reqUrl + "/teacher/data/:id.json", {
                id: "@id"
            })
        }

    }
})();