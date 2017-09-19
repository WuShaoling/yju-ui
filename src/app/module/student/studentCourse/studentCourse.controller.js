(function() {
    'use strict';

    angular
        .module('phoenix')
        .controller('studentCourseCtrl', studentCourseCtrl);

    studentCourseCtrl.$inject = ['$scope'];

    function studentCourseCtrl($scope) {
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

    }
})();