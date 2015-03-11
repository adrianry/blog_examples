(function (angular, jcs) {
    'use strict';

    angular.module(jcs.modules.task.name).config([
        '$routeProvider',
        function ($routeProvider) {
            $routeProvider.when(jcs.modules.task.routes.task, {
                controller: jcs.modules.task.controllers.task,
                templateUrl: 'js/modules/task/html/task.tmpl.html',
                access: {
                    loginRequired: true,
                    permissions: ['zeigeTask','TaskAdmin'],
                    permissionType: 'AtLeastOne'
                }
            });
            $routeProvider.when(jcs.modules.task.routes.einstellungen, {
                controller: jcs.modules.task.controllers.task,
                templateUrl: 'js/modules/task/html/einstellungen.tmpl.html',
                access: {
                    loginRequired: true,
                    permissions: ['zeigeEinstellungen']
                }
            });
        }]);


}(angular, jcs));