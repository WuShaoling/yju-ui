(function() {
    'use strict';

    angular
        .module('phoenix')
        .controller('MainController', MainController);

    MainController.$inject = ['$scope', '$timeout', 'commonSrv','stuCourseSrv', 'teacherCourseSrv','$rootScope'];

    function MainController($scope, $timeout, commonSrv,stuCourseSrv,teacherCourseSrv,$rootScope) {
        $scope.show = false

        $scope.getNotifications = function () {
            if(localStorage['userRole'] == 1) {
                stuCourseSrv.getNotifications().get({
                    studentId: localStorage['userId']
                }).$promise.then(function (response) {
                    console.log(response);

                    $scope.notifications = response.data.resHomeworkList;
                    $scope.show = true

                }, function (error) {
                    console.log(error);
                })
            } else if(localStorage['userRole'] == 2){
                teacherCourseSrv.getNotifications().get({
                    teacherId: localStorage['userId']
                }).$promise.then(function (response) {
                    console.log(response);
                    $scope.show = true

                    $scope.notifications = response.data.resHomeworkList;

                }, function (error) {

                    console.log(error);
                })
            }
        }

        $scope.play = function() {
            $('video')[0].play();
        }
        commonSrv.getHotCourses().get().$promise.then(
            function(response) {
                console.log(response)
                if(response.errorCode == 0) {
                    $scope.courses = response.data.courseList
                }
            },
            function(error) {}
        )
        commonSrv.getStatistics().get().$promise.then(
            function(response) {
                console.log(response)
                if(response.errorCode == 0) {
                    $scope.statistics = response.data
                }
            },
            function(error) {}
        )

        $rootScope.$on('login',function (event,data) {
            if(data=="1"){
                $scope.getNotifications();
                console.log(data);

            }else{
                $scope.show = false

            }
        })
        $scope.getNotifications();

        // if(localStorage['userRole']=="1" || localStorage['userRole']=="2"){
        //             $scope.show = true
        // }
        $scope.change = function() {
            $scope.searchCourseDetailType = $scope.searchCourseType.contain[0]
        }
        $scope.courseTypes = [{
            label: "全部",
            value: "0",
            contain: [{
                label: "全部",
                value: "0",
            }, {
                label: "Python",
                value: "0",
            }, {
                label: "Linux",
                value: "0",
            }, {
                label: "Web",
                value: "0",
            }, {
                label: "C",
                value: "0",
            }, {
                label: "Java",
                value: "0",
            }, {
                label: "PHP",
                value: "0",
            }, {
                label: "机器学习",
                value: "0",
            }, {
                label: "NodeJS",
                value: "0",
            }],
        }, {
            label: "后端开发",
            value: "0",
            contain: [{
                label: "全部",
                value: "0",
            }],
        }, {
            label: "Linux运维",
            value: "0",
            contain: [{
                label: "全部",
                value: "0",
            }, {
                label: "Java",
                value: "0",
            }, {
                label: "PHP",
                value: "0",
            }, {
                label: "机器学习",
                value: "0",
            }, {
                label: "NodeJS",
                value: "0",
            }],
        }, {
            label: "云计算与大数据",
            value: "0",
            contain: [{
                label: "全部",
                value: "0",
            }, {
                label: "Python",
                value: "0",
            }, {
                label: "Linux",
                value: "0",
            }, {
                label: "Web",
                value: "0",
            }, {
                label: "C",
                value: "0",
            }],
        }, {
            label: "数据库",
            value: "0",
            contain: [],
        }, {
            label: "信息安全",
            value: "0",
            contain: [],
        }, {
            label: "Web前端",
            value: "0",
            contain: [],
        }, {
            label: "计算机专业课",
            value: "0",
            contain: [],
        }, {
            label: "其他技术",
            value: "0",
            contain: [],
        }]
    }
})();