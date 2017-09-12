(function() {
    'use strict';

    angular
        .module('opera')
        .run(runBlock);

    /** @ngInject */
    function runBlock($log) {
        console.log(111);
        $log.debug('runBlock end');
    }

})();