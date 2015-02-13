(function (angular, jcs) {
    'use strict';

    jcs.modules.auth = {
        name: 'auth',
        enums: {
            authorised: {
                authorised: 0,
                loginRequired: 1,
                notAuthorised: 2
            },
            permissionCheckType: {
                atLeastOne: 0,
                combinationRequired: 1
            }
        },
        events: {
          userLoggedIn: 'auth:user:loggedIn',
          userLoggedOut: 'auth:user:loggedOut'
        },
        controllers: {
            login: 'loginCtrl',
            logout: 'logoutCtrl'
        },
        services: {
            authentication: 'authentication',
            authorization: 'authorization'
        },
        routes: {
            login: '/login',
            notAuthorised: '/not-authorised',
            logout: '/logout'
        }
    };

    angular.module(jcs.modules.auth.name, [
        'ngRoute',
        jcs.modules.core.name
    ]);


}(angular, jcs));