(function() {
    'use strict';

    angular
        .module('phoenix')
        .controller('introCtrl', introCtrl);

    introCtrl.$inject = ['$timeout'];

    function introCtrl($timeout) {

        $('.imgctrl').height($(window).height())

        $(window).bind('resize', function() {
            console.log(123);
            $timeout(function() {

                // $('.imgctrl').height($(window).height())

            }, 500)
        });
    }
})();