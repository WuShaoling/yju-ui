(function() {
    'use strict';

    angular
        .module('phoenix')
        .service('teacherCourseSrv', teacherCourseSrv);

    teacherCourseSrv.$inject = ['reqUrl', '$resource'];

    function teacherCourseSrv(reqUrl, $resource) {

        this.getAllCourse = function() {
            return $resource(reqUrl + "/teacher/:teacherId/course/all", {
                teacherId: "@teacherId"
            })
        }
        this.getCourseDetail = function() {
            return $resource(reqUrl + "/teacher/course/:classId", {
                classId: "@classId"
            })
        }
        this.getModuleHw = function() {
            return $resource(reqUrl + "/teacher/course/:moduleId/homework", {
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