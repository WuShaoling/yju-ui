// (function() {
//     'use strict';

//     angular
//         .module('phoenix')
//         .controller('loginCtrl', loginCtrl);

//     loginCtrl.$inject = ['$scope'];

//     function loginCtrl($scope) {

//         $scope.usertypes = [{
//             "label": "老师",
//             "value": "教职工编号"
//         }, {
//             "label": "学生",
//             "value": "学生编号"
//         }, {
//             "label": "教务",
//             "value": "教职工编号"
//         }]
//         $scope.user = {};

//         $scope.user.type = $scope.usertypes[1];
//         $scope.change = function() {
//             console.log($scope.user.type);
//         }
//     }
// })();