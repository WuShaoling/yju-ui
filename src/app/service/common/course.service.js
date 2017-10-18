(function() {
    'use strict';

    angular
        .module('phoenix')
        .service('courseSrv', courseSrv);

    courseSrv.$inject = ['$resource', 'reqUrl'];

    function courseSrv($resource, reqUrl) {
        this.getCourseDetail = getCourseDetail;

        ////////////////

        function getCourseDetail() {
            return $resource(reqUrl + "/courseDetail/:courseId.json", {
                courseId: "@courseId"
            })
        }
    }
})();