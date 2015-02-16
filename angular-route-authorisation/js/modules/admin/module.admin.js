(function (angular, jcs) {
    'use strict';

    jcs.modules.admin = {
        name: 'admin',
        controllers: {
            users: 'userListCtrl'
        },
        routes: {
            users: '/users',
            einstellungen: '/einstellungen'
        }
    };

    angular.module(jcs.modules.admin.name, [
        'ngRoute'
    ]);


}(angular, jcs));