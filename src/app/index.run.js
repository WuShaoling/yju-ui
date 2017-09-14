(function() {
    'use strict';

    angular
        .module('phoenix')
        .run(runBlock);

    /** @ngInject */
    function runBlock($log) {
        console.log(111);
        $log.debug('runBlock end');
    }

})();