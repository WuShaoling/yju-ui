(function() {
    'use strict';
    // angular.module('phoenix').value('reqUrl', "http://localhost:8080")

    angular.module('phoenix').value('reqUrl', "http://www.x-lab.ac:13001")

    //toastr配置
    toastr.options = {
        "closeButton": true,
        "debug": false,
        "progressBar": true,
        "preventDuplicates": false,
        "positionClass": "toast-top-right",
        "onclick": null,
        "showDuration": "400",
        "hideDuration": "1000",
        "timeOut": "2000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    };
    angular.module('phoenix').config(['usSpinnerConfigProvider', function(usSpinnerConfigProvider) {


        // 配置 spinner (使用方法:
        // 1.现在页面上使用<span us-spinner spinner-key="spinner-XXX-list" spinner-start-active="true"></span>
        // 2.inject service
        // 3.设置开始与结束标志
        // )
        usSpinnerConfigProvider.setTheme('classic', { color: 'black', radius: 25, width: 5, length: 20, zIndex: 10 });
    }]);

})();