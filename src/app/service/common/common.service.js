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

        this.modifyPass = function() {
            return $resource(reqUrl + '/auth/updatePassword');
        }

        this.getHotCourses = function() {
            return $resource(reqUrl + '/common/hotCourses/all')
        }

        this.getCourseExperimentDetail = function() {
            return $resource(reqUrl + "/common/course/:courseId/experiments", {
                courseId: "@courseId"
            })
        }
        this.getCourseDetail = function() {
            return $resource(reqUrl + "/common/course/:courseId/detail", {
                courseId: "@courseId"
            })
        }
        this.getStatistics = function() {
            return $resource(reqUrl + "/common/statistics/")
        }
        this.getTeacherDetail = function() {
            return $resource(reqUrl + "/common/teacher/:teacherId", {
                teacherId: "@teacherId"
            })
        }
        this.getExperimentDetail = function() {
            return $resource(reqUrl + '/common/experiment/:experimentId', {
                experimentId: "@experimentId"
            })
        }
    }
})();