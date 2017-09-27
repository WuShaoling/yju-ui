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
            template: '<span class="navbar-minimalize minimalize-styl-2 btn btn-success " ng-click="minimalizeLeft()"><i class="fa " ng-class="{true:\'fa-arrow-left\',false:\'fa-arrow-right\'}[leftControl]"></i></span>',
            controller: function($scope) {
                $scope.minimalizeLeft = function() {
                    console.log(123);
                    angular.element('#leftNav').toggleClass('mini-navbar');
                    if (angular.element('#leftNav').hasClass('mini-navbar')) {
                        if (angular.element('#design').hasClass('col-md-8')) {

                            // Hide menu in order to smoothly turn on when maximize menu
                            angular.element('#leftNav').hide(1000, function() {
                                angular.element('#design').removeClass('col-md-8');
                                angular.element('#design').addClass('col-md-9');

                                angular.element('#cloudware').css('width', "100%");
                                $scope.leftControl = false;
                                $scope.$apply();

                            });
                        } else {
                            angular.element('#leftNav').hide(1000, function() {
                                angular.element('#design').removeClass('col-md-11');
                                angular.element('#design').addClass('col-md-12');

                                angular.element('#cloudware').css('width', "100%");
                                $scope.leftControl = false;
                                $scope.$apply();
                            })
                        }


                        // $scope.refreshTest();
                    } else {
                        if (angular.element('#design').hasClass('col-md-9')) {

                            angular.element('#design').removeClass('col-md-9');
                            angular.element('#design').addClass('col-md-8');
                            angular.element('#leftNav').show(1000, function() {


                                angular.element('#cloudware').css('width', "100%");
                                $scope.leftControl = true;
                                $scope.$apply();

                            });
                        } else {
                            angular.element('#design').removeClass('col-md-12');
                            angular.element('#design').addClass('col-md-11');
                            angular.element('#leftNav').show(1000, function() {


                                angular.element('#cloudware').css('width', "100%");
                                $scope.leftControl = true;
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
            template: '<span class="navbar-minimalize minimalize-styl-2 btn btn-success" ng-click="minimalizeRight()"><i class="fa " ng-class="{true:\'fa-arrow-left\',false:\'fa-arrow-right\'}[rightControl]"></i></span>',
            controller: function($scope) {
                $scope.minimalizeRight = function() {
                    angular.element('#rightNav').toggleClass('mini-navbar');
                    if (angular.element('#rightNav').hasClass('mini-navbar')) {
                        // Hide menu in order to smoothly turn on when maximize menu
                        if (angular.element('#design').hasClass('col-md-8')) {
                            angular.element('#rightNav').hide(1000, function() {
                                angular.element('#design').removeClass('col-md-8');
                                angular.element('#design').addClass('col-md-11');
                                angular.element('#cloudware').css('width', "100%");
                                $scope.rightControl = false;
                                $scope.$apply();
                            });
                        } else {
                            angular.element('#rightNav').hide(1000, function() {
                                angular.element('#design').removeClass('col-md-9');
                                angular.element('#design').addClass('col-md-12');
                                angular.element('#cloudware').css('width', "100%");
                                $scope.rightControl = false;
                                $scope.$apply();
                            });
                        }
                        // $scope.refreshTest();
                    } else {
                        if (angular.element('#design').hasClass('col-md-11')) {

                            angular.element('#design').removeClass('col-md-11');
                            angular.element('#design').addClass('col-md-8');
                            angular.element('#rightNav').show(1000, function() {
                                angular.element('#cloudware').css('width', "100%");
                                $scope.rightControl = true;
                                $scope.$apply();

                            });
                        } else {
                            angular.element('#design').removeClass('col-md-12');
                            angular.element('#design').addClass('col-md-9');
                            angular.element('#rightNav').show(1000, function() {
                                angular.element('#cloudware').css('width', "100%");
                                $scope.rightControl = true;
                                $scope.$apply();

                            });
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
    });