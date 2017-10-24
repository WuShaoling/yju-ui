(function() {
    'use strict';

    angular
        .module('phoenix')
        .service('stuCourseSrv', stuCourseSrv);

    stuCourseSrv.$inject = ['$resource', 'reqUrl'];

    function stuCourseSrv($resource, reqUrl) {
        this.getSelfCourse = getSelfCourse;


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
            return $resource(reqUrl + "/student/course/:classId/homework", {
                classId: "@classId"
            })
        }

        this.getHomeworkDetail = function() {
            return $resource(reqUrl + "/student/homework/:homeworkId", {
                homeworkId: "@homeworkId"
            })
        }

        this.getExperimentDetail = function() {
            return $resource(reqUrl + '/student/experiment/:experimentId')
        }
    }
})();