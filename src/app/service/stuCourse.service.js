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
            return $resource(reqUrl + "/student/studentCourse/:studentId.json", {
                studentId: "@studentId"
            })
        }
        //获取选课详情
        this.getCourseDetail = function() {
            return $resource(reqUrl + "/student/studentCourseDetail/:courseId.json", {
                courseId: "@courseId"
            })
        }

        this.getAllHomework = function() {
            return $resource(reqUrl + "/student/studentHomework/:classId.json", {
                classId: "@classId"
            })
        }

        this.getHomeworkDetail = function() {
            return $resource(reqUrl + "/student/studentDoHomework/:homeworkId.json", {
                homeworkId: "@homeworkId"
            })
        }
    }
})();