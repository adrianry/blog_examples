(function (angular, jcs) {
    'use strict';

    angular.module(jcs.modules.auth.name).config([
        '$routeProvider',
        function ($routeProvider) {
            $routeProvider.when(jcs.modules.auth.routes.login, {
                controller: jcs.modules.auth.controllers.login,
                templateUrl: 'js/modules/auth/html/login.tmpl.html'
            });
            $routeProvider.when(jcs.modules.auth.routes.notAuthorised, {
                controller: jcs.modules.auth.controllers.login,
                templateUrl: 'js/modules/auth/html/not-authorised.tmpl.html'
            });
            $routeProvider.when(jcs.modules.auth.routes.logout, {
                controller: jcs.modules.auth.controllers.logout,
                templateUrl: 'js/modules/auth/html/logout.tmpl.html'
            });

            $routeProvider.otherwise({ redirectTo: jcs.modules.auth.routes.login });
        }]);


}(angular, jcs));