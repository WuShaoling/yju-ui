(function() {
    'use strict';

    angular
        .module('phoenix')
        .controller('MainController', MainController);

    MainController.$inject = ['$scope', '$timeout'];

    function MainController($scope, $timeout) {



        $scope.courses = [{
            id: "1",
            image: "img/home/course/course-img1.jpg",
            duration: "1h20min",
            name: "python语言与数据分析",
            teacher: "Jasper",
            studentNum: "1100",
            price: "70",
            originPrice: "100"
        }, {
            id: "2",
            image: "img/home/course/course-img2.jpg",
            duration: "1h20min",
            name: "R语言与数据分析",
            teacher: "Jane",
            studentNum: "3000",
            price: "80",
            originPrice: "120"
        }, {
            id: "3",
            image: "img/home/course/course-img3.jpg",
            duration: "1h20min",
            name: "大数据与数据分析",
            teacher: "JUny1",
            studentNum: "200",
            price: "90",
            originPrice: "1300"
        }, {
            id: "4",
            image: "img/home/course/course-img4.jpg",
            duration: "2h20min",
            name: "python语言与数据分析",
            teacher: "Raymond",
            studentNum: "2000",
            price: "170",
            originPrice: "400"
        }]


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