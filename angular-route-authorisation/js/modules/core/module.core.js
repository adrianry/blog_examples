(function (angular, jcs) {
    'use strict';

    jcs.modules.core = {
        name: 'jcs-core',
        services: {
            eventbus: 'eventbus',
            usermodel: 'usermodel'
        }
    };

    angular.module(jcs.modules.core.name, []);
}(angular, jcs));
