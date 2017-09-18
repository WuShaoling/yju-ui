(function() {
    'use strict';

    angular
        .module('phoenix')
        .controller('courseDetailCtrl', courseDetailCtrl);

    courseDetailCtrl.$inject = ['$scope'];

    function courseDetailCtrl($scope) {
        $scope.courseOutline = [{
            outlineName: "bash介绍与入门",
            outlineId: "bash介绍与入门",
            finished: 1,
            doucument: "",
        }, {
            outlineName: "bash特殊字符（上",
            outlineId: "bash介绍与入门",
            finished: 1,
            doucument: "",
        }, {
            outlineName: "bash特殊字符（下）",
            outlineId: "bash介绍与入门",
            finished: 0,
            doucument: "",
        }, {
            outlineName: "变量和参数",
            outlineId: "bash介绍与入门",
            finished: 0,
            doucument: "",
        }, {
            outlineName: "基本运算符",
            outlineId: "bash介绍与入门",
            finished: 0,
            doucument: "",
        }];
    }
})();