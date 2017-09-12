(function() {
    'use strict';

    angular
        .module('inspinia')
        .run(runBlock);

    /** @ngInject */
    function runBlock($log) {
        console.log(111);
        $log.debug('runBlock end');
    }

})();