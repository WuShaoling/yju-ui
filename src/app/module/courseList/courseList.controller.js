(function() {
    'use strict';

    angular
        .module('phoenix')
        .controller('courseListCtrl', courseListCtrl);

    courseListCtrl.$inject = ['$scope'];

    function courseListCtrl($scope) {
        // $(window).load(function() {
        //     $('.version2 ').each(function() {
        //         var header_area = $('.header-v2');
        //         var main_area = header_area.children('.header');

        //         var logo = main_area.find('.navbar-header');
        //         var navigation = main_area.find('.navbar-collapse');
        //         var original = {
        //             nav_top: navigation.css('margin-top')
        //         };

        //         $(window).scroll(function() {
        //             if (main_area.hasClass('bb-fixed-header') && ($(this).scrollTop() === 0)) {
        //                 main_area.removeClass('bb-fixed-header').appendTo(header_area);
        //                 navigation.animate({
        //                     'margin-top': original.nav_top
        //                 }, {
        //                     duration: 300,
        //                     queue: false,
        //                     complete: function() {
        //                         header_area.css('height', 'auto');
        //                     }
        //                 });
        //             } else if (!main_area.hasClass('bb-fixed-header') && $(this).width() > 250 &&
        //                 $(this).scrollTop() > header_area.offset().top + header_area.height() - parseInt($('html').css('margin-top'), 10)) {
        //                 header_area.css('height', header_area.height());
        //                 main_area.css({
        //                     'opacity': '0'
        //                 }).addClass('bb-fixed-header');
        //                 main_area.appendTo($('body')).animate({
        //                     'opacity': 1
        //                 });

        //                 navigation.css({
        //                     'margin-top': '0px'
        //                 });
        //             }
        //         });
        //     });

        //     $(window).trigger('resize');
        //     $(window).trigger('scroll');
        // });
    }
})();