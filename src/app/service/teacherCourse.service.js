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
            return $resource(reqUrl + "/teacher/course/:moduleId/:classId/homework", {
                moduleId: "@moduleId",
                classId: "@classId"
            })
        }

        this.getHwDetail = function() {
            return $resource(reqUrl + "/teacher/data/:id.json", {
                id: "@id"
            })
        }

        this.getStuHomeworkDetail = function() {
            return $resource(reqUrl + '/teacher/course/homework/:studentHomeworkId', {
                studentHomeworkId: "@studentHomeworkId"
            })
        }


        this.grade = function() {
            return $resource(reqUrl + '/teacher/course/homework/grade')
        }

        this.getNotifications = function () {
            return $resource(reqUrl+'/teacher/course/homework/all/:teacherId',{
                teacherId:"@teacherId"
            })
        }
    }
})();