(function() {
    'use strict';

    angular
        .module('phoenix')
        .controller('MainController', MainController);

    MainController.$inject = ['$scope', '$timeout', 'commonSrv'];

    function MainController($scope, $timeout, commonSrv) {

        $scope.play = function() {
            $('video')[0].play();
        }
        commonSrv.getHotCourses().get().$promise.then(
            function(response) {
                console.log(response)
                $scope.courses = response.data.courseList
            },
            function(error) {}
        )


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