(function() {
    'use strict';

    angular
        .module('phoenix')
        .service('courseManagementSrv', courseManagementSrv);

    courseManagementSrv.$inject = ['reqUrl', '$resource'];

    function courseManagementSrv(reqUrl, $resource) {
        this.addcourse = function() {
            return $resource(reqUrl + '/admin/course/creation')
        }

        this.getAllCourse = function() {
            return $resource(reqUrl + '/admin/course/all')
        }
        this.editcourse = function() {
            return $resource(reqUrl + "/admin/course/updation")
        }
        this.deletecourse = function() {
            return $resource(reqUrl + "/admin/course/deletion")
        }

        this.getCourseDetail = function() {
            return $resource(reqUrl + '/admin/course/:courseId/experiments', {
                courseId: "@courseId"
            })
        }

        this.addModule = function() {
            return $resource(reqUrl + '/admin/course/module/creation')
        }
        this.deleteModule = function() {
            return $resource(reqUrl + '/admin/course/module/deletion')

        }

        this.addExperiment = function() {
            return $resource(reqUrl + '/admin/course/module/experiment/creation')
        }
        this.deleteExperiment = function() {
            return $resource(reqUrl + "/admin/course/experiment/deletion")
        }

        this.getModuleLib = function() {
            return $resource(reqUrl + '/admin/course/:moduleId/lib', {
                moduleId: "@moduleId"
            })
        }

        this.addModuleLib = function() {
            return $resource(reqUrl + '/admin/course/lib/add')
        }

        this.deleteLibPic = function() {
            return $resource(reqUrl + '/admin/course/lib/deletion')

        }

    }
})();