(function() {
    'use strict';

    angular
        .module('phoenix')
        .run(runBlock);

    /** @ngInject */
    function runBlock($log, $rootScope, $state) {

        $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
            //当路由改变时，在加载模板之前判断该用户是否有进入该界面的权限，以防有人通过url直接访问某个页面。
            console.log(toState);
            if (!localStorage['logined'] && toState.name != 'index.main') {
                $state.go('login');
            }
            if (toState.name == "index") {
                $state.go('index.main');
            }
        });
        // console.log(111);
        // $log.debug('runBlock end');
    }

})();