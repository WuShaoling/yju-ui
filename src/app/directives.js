'use strict';

//Directive used to set metisMenu and minimalize button
angular.module('phoenix')
    .directive('sideNavigation', function($timeout) {
        return {
            restrict: 'A',
            link: function(scope, element) {
                // Call metsi to build when user signup
                scope.$watch('authentication.user', function() {
                    $timeout(function() {
                        element.metisMenu();
                    });
                });

            }
        };
    })
    .directive('leftBar', function () {
        var originalRightWidth;
        var originalLeftWidth;
        return {
            restrict: 'A',
            // template: '<a class="navbar-minimalize minimalize-styl-2 btn btn-primary " href="" ng-click="minimalize()">题库</a>',
            template: '<button style="position: fixed;top:100px;left:0;z-index:101" class="navbar-minimalize minimalize-styl-2 btn btn-success " tooltip-placement="right" uib-tooltip="{{leftText}}" ng-disabled="maximized" ng-click="minimalizeLeft()"><i class="fa " ng-class="{true:\'fa-arrow-right\',false:\'fa-arrow-left\'}[minimized]"></i></button>' +
                      '<button style="position: fixed;top:132px;left:0;z-index:101" class="navbar-minimalize minimalize-styl-2 btn btn-success " tooltip-placement="left" uib-tooltip="教程全屏" ng-disabled="minimized" ng-click="fullScreenDes()"><i class="fa fa-expand" ></i></button>',
            controller: function($scope) {
                $scope.minimized = false;
                $scope.maximized = false;
                $scope.minimalizeLeft = function() {

                    angular.element('#leftNav').toggleClass('mini-navbar');
                    if (angular.element('#leftNav').hasClass('mini-navbar')) {
                        originalRightWidth = $($('#design')[0]).width();
                        angular.element('#resizeDiv').hide();
                        $($('#leftNav')[0]).css({"min-width": "0%"});
                        angular.element('#leftNav').hide(200, function() {
                            $($('#design')[0]).css({"float": ""});
                            $($('#design')[0]).width("85%");
                        });

                        $scope.leftText = "显示教程";

                    } else {
                        $($('#design')[0]).css({"float": "right"});
                        $($('#design')[0]).width(originalRightWidth);
                        angular.element('#leftNav').show(200, function () {
                            angular.element('#resizeDiv').show();
                            $($('#leftNav')[0]).css({"min-width": "33%"});
                        });
                        $scope.leftText = "隐藏教程";
                    }
                    $scope.minimized = !$scope.minimized;
                };
                $scope.fullScreenDes = function() {
                    if (!$scope.maximized) {
                        originalLeftWidth = $($('#leftNav')[0]).width();
                        angular.element('#resizeDiv').hide(500);
                        angular.element('#design').hide(500, function() {
                            $($('#leftNav')[0]).css({"max-width": "100%"});
                            $($('#leftNav')[0]).width("100%");
                        });
                    } else {
                        $($('#leftNav')[0]).css({"max-width": "66%"});
                        $($('#leftNav')[0]).width(originalLeftWidth);
                        angular.element('#resizeDiv').show(500);
                        angular.element('#design').show(500);
                    }
                    $scope.maximized = !$scope.maximized;
                }
            }
        };
    })
    .directive('minimalizaRight', ['$timeout', function($timeout) {
        return {
            restrict: 'A',
            // template: '<a class="navbar-minimalize minimalize-styl-2 btn btn-primary " href="" ng-click="minimalize()">题库</a>',
            template: '<span class="navbar-minimalize minimalize-styl-2 btn btn-success" tooltip-placement="left" uib-tooltip="{{rightText}}" ng-click="minimalizeRight()"><i class="fa " ng-class="{true:\'fa-arrow-right\',false:\'fa-arrow-left\'}[rightControl]"></i></span>',
            controller: function($scope) {
                $scope.minimalizeRight = function() {
                    angular.element('#rightNav').toggleClass('mini-navbar');
                    if (angular.element('#rightNav').hasClass('mini-navbar')) {
                        // Hide menu in order to smoothly turn on when maximize menu

                        angular.element('#rightNav').hide(1000, function() {

                            $scope.rightControl = false;
                            $scope.rightText = "显示工具栏";

                            $scope.$apply();

                        });


                        // $scope.refreshTest();
                    } else {
                        angular.element('#rightNav').show(1000, function() {
                            angular.element('#cloudware').css('width', "100%");
                            $scope.rightControl = true;
                            $scope.rightText = "隐藏工具栏";

                            $scope.$apply();

                        });
                    }
                };
            }
        };
    }])
    .directive('minimalizaSidebar', function($timeout) {
        return {
            restrict: 'A',
            template: '<a class="navbar-minimalize minimalize-styl-2 btn btn-success " href="" ng-click="minimalize()"><i class="fa fa-bars"></i></a>',
            controller: function($scope) {
                $scope.minimalize = function() {
                    angular.element('body').toggleClass('mini-navbar');
                    if (!angular.element('body').hasClass('mini-navbar') || angular.element('body').hasClass('body-small')) {
                        // Hide menu in order to smoothly turn on when maximize menu
                        angular.element('#side-menu').hide();
                        // For smoothly turn on menu
                        $timeout(function() {
                            angular.element('#side-menu').fadeIn(400);
                        }, 200);
                    } else {
                        // Remove all inline style from jquery fadeIn function to reset menu state
                        angular.element('#side-menu').removeAttr('style');
                    }
                };
            }
        };
    })
    .directive('fileModel', ['$parse', function($parse) {
        return {
            restrict: 'A',
            link: function(scope, element, attrs, ngModel) {
                var model = $parse(attrs.fileModel);
                var modelSetter = model.assign;
                element.bind('change', function(event) {
                    // scope.$apply(function() {
                    //     modelSetter(scope, element[0].files[0]);
                    // });
                    // console.info(scope);
                    //附件预览
                    scope.file = (event.srcElement || event.target).files[0];
                    // console.log(scope.file);
                    scope.getFile(scope.file);
                });
            }
        };
    }]);