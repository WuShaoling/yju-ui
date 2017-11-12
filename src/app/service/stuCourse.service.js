(function() {
    'use strict';

    angular
        .module('phoenix')
        .service('stuCourseSrv', stuCourseSrv);

    stuCourseSrv.$inject = ['$resource', 'reqUrl'];

    function stuCourseSrv($resource, reqUrl) {
        this.getSelfCourse = getSelfCourse;
        this.getNotifications = function() {
            return $resource(reqUrl + '/student/course/homework/all/:studentId', {
                studentId: "@studentId"
            })
        }

        //获取我的选课
        function getSelfCourse() {
            return $resource(reqUrl + "/student/course/all/:studentId", {
                studentId: "@studentId"
            })
        }
        //获取选课详情
        this.getCourseDetail = function() {
            return $resource(reqUrl + "/student/course/:classId/detail", {
                classId: "@classId"
            })
        }

        this.getAllHomework = function() {
            return $resource(reqUrl + "/student/course/:classId/:studentId/homework", {
                classId: "@classId",
                studentId: "@studentId"
            })
        }

        this.getHomeworkDetail = function() {
            return $resource(reqUrl + "/student/homework/:homeworkId", {
                homeworkId: "@homeworkId"
            })
        }

        this.getExperimentDetail = function() {
            return $resource(reqUrl + '/student/experiment/:experimentId', {
                experimentId: "@experimentId"
            })
        }

        this.getHwCloudwareInfo = function() {
            return $resource(reqUrl + '/student/homework/:homeworkId/:studentId/cloudware', {
                homeworkId: "@homeworkId",
                studentId: "@studentId"
            })
        }
        this.getExCloudwareInfo = function() {
            return $resource(reqUrl + '/student/experiment/:experimentId/:studentId/cloudware', {
                experimentId: "@experimentId",
                studentId: "@studentId"
            })
        }

        this.createHwCloudware = function() {
            return $resource(reqUrl + '/student/homework/creation')
        }
        this.createExCloudware = function() {
            return $resource(reqUrl + '/student/experiment/creation')
        }

        this.submitHomework = function() {
            return $resource(reqUrl + '/student/homework/submission')
        }

        this.getHomeworkScore = function() {
            return $resource(reqUrl + '/student/course/homework/:homeworkId/:studentId', {
                homeworkId: "@homeworkId",
                studentId: "@studentId"
            })
        }

        this.deleteExCloudware = function() {
            return $resource(reqUrl + '/student/experiment/delete', {
                studentId: "@studentId",
                experimentId: "@experimentId"
            })
        }

        this.getLastExperiment = function () {
            return $resource(reqUrl + '/student/experiment/last/:studentId', {
                studentId: "@studentId",
            })
        }
    }
})();