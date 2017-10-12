(function() {
    'use strict';

    angular
        .module('phoenix')
        .controller('studentCourseCtrl', studentCourseCtrl);

    studentCourseCtrl.$inject = ['$scope'];

    function studentCourseCtrl($scope) {
        $scope.courses = [{
            id: "1",
            image: "img/dataSience.jpg",
            duration: "1h20min",
            name: "数据科学通识导论",
            teacher: "Jasper",
            studentNum: "1100",
            price: "70",
            originPrice: "100"
        }, {
            id: "2",
            image: "img/spss.jpg",
            duration: "1h20min",
            name: "SPSS统计分析与实践",
            teacher: "Jane",
            studentNum: "3000",
            price: "80",
            originPrice: "120"
        }, {
            id: "3",
            image: "img/linux.jpg",
            duration: "1h20min",
            name: "Linux基础知识与实训",
            teacher: "JUny1",
            studentNum: "200",
            price: "90",
            originPrice: "1300"
        }, {
            id: "4",
            image: "img/bigData.jpg",
            duration: "2h20min",
            name: "大数据原理与实践",
            teacher: "Raymond",
            studentNum: "2000",
            price: "170",
            originPrice: "400"
        }]

    }
})();