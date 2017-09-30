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
    .directive('minimalizaLeft', ['$timeout', function($timeout) {
        return {
            restrict: 'A',
            // template: '<a class="navbar-minimalize minimalize-styl-2 btn btn-primary " href="" ng-click="minimalize()">题库</a>',
            template: '<span class="navbar-minimalize minimalize-styl-2 btn btn-success " tooltip-placement="right" uib-tooltip="{{leftText}}" ng-click="minimalizeLeft()"><i class="fa " ng-class="{true:\'fa-arrow-left\',false:\'fa-arrow-right\'}[leftControl]"></i></span>',
            controller: function($scope) {
                $scope.minimalizeLeft = function() {

                    angular.element('#leftNav').toggleClass('mini-navbar');
                    if (angular.element('#leftNav').hasClass('mini-navbar')) {
                        if (angular.element('#design').hasClass('col-md-9')) {

                            // Hide menu in order to smoothly turn on when maximize menu
                            angular.element('#leftNav').hide(500, function() {
                                angular.element('#design').removeClass('col-md-9');
                                angular.element('#design').addClass('col-md-12');

                                angular.element('#cloudware').css('width', "100%");
                                $scope.$apply();


                            });
                            $scope.leftControl = false;

                            $scope.leftText = "显示教程";

                        } else {
                            angular.element('#leftNav').hide(500, function() {
                                angular.element('#design').removeClass('col-md-12');
                                angular.element('#design').addClass('col-md-9');

                                angular.element('#cloudware').css('width', "100%");
                                $scope.$apply();
                            })
                            $scope.leftControl = false;

                            $scope.leftText = "显示教程";

                        }


                        // $scope.refreshTest();
                    } else {
                        if (angular.element('#design').hasClass('col-md-9')) {

                            angular.element('#design').removeClass('col-md-9');
                            angular.element('#design').addClass('col-md-8');
                            angular.element('#leftNav').show(500, function() {


                                angular.element('#cloudware').css('width', "100%");
                                $scope.$apply();

                            });
                            $scope.leftControl = true;

                            $scope.leftText = "隐藏教程";

                        } else {
                            angular.element('#design').removeClass('col-md-12');
                            angular.element('#design').addClass('col-md-9');
                            $scope.leftText = "隐藏教程";
                            $scope.leftControl = true;

                            angular.element('#leftNav').show(500, function() {


                                angular.element('#cloudware').css('width', "100%");
                                $scope.$apply();


                            })
                        }
                        // Remove all inline style from jquery fadeIn function to reset menu state
                        // angular.element('#lib').removeAttr('style');

                        //刷新
                        // $scope.refreshTest();
                    }
                };
            }
        };
    }])
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