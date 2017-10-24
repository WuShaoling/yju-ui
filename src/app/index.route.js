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
                controller: "commonCtrl as common"
            })
            .state('login', {
                url: "/login",
                templateUrl: "app/module/login/login.html",
                controller: "loginCtrl"
            })
            .state('intro', {
                url: "",
                templateUrl: "app/module/intro/intro.html",
                controller: "introCtrl"
            })
            .state('index.main', {
                url: "/main",
                templateUrl: "app/module/main/main.html",
                controller: "MainController"
            })
            .state('index.pageNotFound', {
                url: "/pageNotFound",
                templateUrl: "app/module/404page/404page.html",
                controller: "pageNotFoundCtrl"
            })

        .state('index.about', {
                url: "/about",
                templateUrl: "app/module/about/about.html",
                controller: "aboutCtrl"
            })
            .state('index.notification', {
                url: "/notification",
                templateUrl: "app/module/notification/notification.html",
                controller: "notificationCtrl"
            })


        .state('index.files', {
                url: "/files/:id",
                params: { id: '' },
                templateUrl: "app/module/fileManagement/files.html",
                controller: "FileManagerCtrl as FM"
            })
            .state('index.courseDetail', {
                url: "/courseDetail/:courseId",
                params: { "courseId": null },
                templateUrl: "app/module/courseDetail/courseDetail.html",
                controller: "courseDetailCtrl"
            })
            .state('index.courseDetail1', {
                url: "/courseDetail1/:courseId",
                params: { "courseId": null },

                templateUrl: "app/module/courseDetail/courseDetail_1.html",
                controller: "courseDetail1Ctrl"
            })

        //cloudware
        .state('index.cloudware', {
                url: "/cloudware",
                templateUrl: "app/module/cloudware/cloudware.html",
                controller: "cloudwareCtrl"
            })
            .state('index.cloudware.experiment', {
                url: "/cloudware/experiment",
                templateUrl: "app/module/cloudware/experiment.html",
                controller: "experimentCtrl"
            })
            //end
            //student
            .state('index.studentCourse', {
                url: "/student/course",
                templateUrl: "app/module/student/studentCourse/studentCourse.html",
                controller: "studentCourseCtrl"
            })
            .state('index.studentCourseDetail', {
                url: "/student/:classId/course/detail",
                params: { courseId: null, classId: null },
                templateUrl: "app/module/student/studentCourseDetail/studentCourseDetail.html",
                controller: "studentCourseDetailCtrl"
            })

        .state('index.studentHomework', {
                url: "/student/:classId/homework",
                params: { classId: null },
                templateUrl: "app/module/student/studentHomework/studentHomework.html",
                controller: "studentHomeworkCtrl"
            })
            .state('index.studentDoHomework', {
                url: "/student/homework/:homeworkId/:type/:studentId/detail",
                params: { homeworkId: null, type: "0", studentId: null },
                templateUrl: "app/module/student/studentDoHomework/studentDoHomework.html",
                controller: "studentDoHomeworkCtrl"
            })
            .state('index.startExperiment', {
                url: "/course/experiment/:experimentId/:type/:studentId",
                params: { homeworkId: null, type: "1", studentId: null },
                templateUrl: "app/module/student/studentStartExperiment/studentStartExperiment.html",
                controller: "studentStartExperimentCtrl"
            })
            .state('index.studentDoHomework.cloudware', {
                url: "/cloudware",
                templateUrl: "app/module/cloudware/cloudware.html",
                controller: "cloudwareCtrl"
            })
            .state('index.startExperiment.cloudware', {
                url: "/cloudware",
                templateUrl: "app/module/cloudware/cloudware.html",
                controller: "cloudwareCtrl"
            })
            .state('index.test', {
                url: "/test",
                templateUrl: "app/module/student/test/test.html",
                controller: "testCtrl"
            })
            //student end

        //teacher

        .state('index.teacherCourse', {
                url: "/teacher/course",
                templateUrl: "app/module/teacher/teacherCourse/teacherCourse.html",
                controller: "teacherCourseCtrl"
            })
            .state('index.teacherCourseManagement', {
                url: "/teacher/course/:courseId/management",
                params: { courseId: null },

                templateUrl: "app/module/teacher/teacherCourseManagement/teacherCourseManagement.html",
                controller: "teacherCourseManagementCtrl"
            })
            .state('index.homeworkDetail', {
                url: "/teacher/course/:moduleId/homework",
                params: { moduleId: null },
                templateUrl: "app/module/teacher/homeworkDetail/homeworkDetail.html",
                controller: "homeworkDetailCtrl"
            })
            .state('index.cloudware.checkHomework', {
                url: "/teacher/homework/:id",
                params: { courseId: null, id: null },
                templateUrl: "app/module/teacher/checkHomework/checkHomework.html",
                controller: "checkHomeworkCtrl"
            })
            //teacher end

        //administrator
        .state('index.classManagement', {
                url: "/administrator/classManagement",

                templateUrl: "app/module/administrator/classManagement/classManagement.html",
                controller: "classManagementCtrl"
            })
            .state('index.teacherManagement', {
                url: "/administrator/teacherManagement",

                templateUrl: "app/module/administrator/teacherManagement/teacherManagement.html",
                controller: "teacherManagementCtrl"
            })
            .state('index.addNewEx', {
                url: "/administrator/:moduleId/addNewEx",
                params: { moduleId: null },
                templateUrl: "app/module/administrator/addNewEx/addNewEx.html",
                controller: "addNewExCtrl"
            })
            .state('index.semesterManagement', {
                url: "/administrator/semesterManagement",

                templateUrl: "app/module/administrator/semesterManagement/semesterManagement.html",
                controller: "semesterManagementCtrl"
            })
            .state('index.courseManagement', {
                url: "/administrator/courseManagement",

                templateUrl: "app/module/administrator/courseManagement/courseManagement.html",
                controller: "courseManagementCtrl"
            })
            .state('index.courseMaintainence', {
                url: "/administrator/:courseId/courseMaintainence",
                params: { courseId: null },
                templateUrl: "app/module/administrator/courseMaintainence/courseMaintainence.html",
                controller: "courseMaintainenceCtrl"
            })
            .state('index.homeworkManagement', {
                url: "/administrator/:classId/homeworkManagement",
                params: { classId: null },
                templateUrl: "app/module/administrator/homeworkManagement/homeworkManagement.html",
                controller: "homeworkManagementCtrl"
            })
            .state('index.adCheckHw', {
                url: "/administrator/adCheckHw",

                templateUrl: "app/module/administrator/adCheckHw/adCheckHw.html",
                controller: "adCheckHwCtrl"
            })
            .state('index.adCheckEx', {
                url: "/administrator/adCheckEx",

                templateUrl: "app/module/administrator/adCheckEx/adCheckEx.html",
                controller: "adCheckExCtrl"
            })
            .state('index.classDetail', {
                url: "/administrator/:classId/classDetail",
                params: { classId: null },
                templateUrl: "app/module/administrator/classDetail/classDetail.html",
                controller: "classDetailCtrl"
            })
            //end
            .state('index.courseList', {
                url: "/courseList",
                templateUrl: "app/module/courseList/courseList.html",
                // controller: "mainController"
            });

        // $urlRouterProvider.otherwise('/pageNotFound');
    }

})();