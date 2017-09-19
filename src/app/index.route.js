(function() {
    'use strict';

    angular
        .module('phoenix')
        .config(routerConfig);

    /** @ngInject */
    function routerConfig($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('index', {
                url: "/index",
                templateUrl: "app/module/common/common.html",
                controller: "commonCtrl"
            })
            .state('login', {
                url: "/login",
                templateUrl: "app/module/login/login.html",
                controller: "loginCtrl"
            })
            .state('index.main', {
                url: "/main",
                templateUrl: "app/module/main/main.html",
                controller: "MainController"
            })
            .state('index.about', {
                url: "/about",
                templateUrl: "app/module/about/about.html",
                controller: "aboutCtrl"
            })
            .state('index.courseDetail', {
                url: "/courseDetail",
                templateUrl: "app/module/courseDetail/courseDetail.html",
                controller: "courseDetailCtrl"
            })
            .state('index.courseDetail1', {
                url: "/courseDetail1",
                templateUrl: "app/module/courseDetail/courseDetail_1.html",
                controller: "courseDetail1Ctrl"
            })
            //student
            .state('index.studentCourse', {
                url: "/student/course",
                templateUrl: "app/module/student/studentCourse/studentCourse.html",
                controller: "studentCourseCtrl"
            })
            .state('index.studentCourseDetail', {
                url: "/student/course/detail",
                templateUrl: "app/module/student/studentCourseDetail/studentCourseDetail.html",
                controller: "studentCourseDetailCtrl"
            })
            .state('index.studentStartExperiment', {
                url: "/student/course/experiment",
                templateUrl: "app/module/student/studentStartExperiment/studentStartExperiment.html",
                controller: "studentStartExperimentCtrl"
            })
            .state('index.studentHomework', {
                url: "/student/course/homework",
                templateUrl: "app/module/student/studentHomework/studentHomework.html",
                controller: "studentHomeworkCtrl"
            })
            .state('index.studentDoHomework', {
                url: "/student/course/homework/detail",
                templateUrl: "app/module/student/studentDoHomework/studentDoHomework.html",
                controller: "studentDoHomeworkCtrl"
            })
            //student end

        //teacher

        .state('index.teacherCourse', {
                url: "/teacher/course",
                templateUrl: "app/module/teacher/teacherCourse/teacherCourse.html",
                controller: "teacherCourseCtrl"
            })
            .state('index.teacherCourseManagement', {
                url: "/teacher/course/management/:id",
                params: { id: null },
                templateUrl: "app/module/teacher/teacherCourseManagement/teacherCourseManagement.html",
                controller: "teacherCourseManagementCtrl"
            })
            .state('index.homeworkDetail', {
                url: "/teacher/course/homework/:id",
                params: { id: null },
                templateUrl: "app/module/teacher/homeworkDetail/homeworkDetail.html",
                controller: "homeworkDetailCtrl"
            })
            //teacher end
            .state('index.courseList', {
                url: "/courseList",
                templateUrl: "app/module/courseList/courseList.html",
                // controller: "mainController"
            });

        $urlRouterProvider.otherwise('/index/main');
    }

})();