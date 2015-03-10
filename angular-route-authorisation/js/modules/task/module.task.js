(function (angular, jcs) {
    'use strict';

    jcs.modules.task = {
        name: 'task',
        controllers: {
            task: 'taskListCtrl'
        },
        routes: {
            task: '/task',
            einstellungen: '/einstellungen'
        }
    };

    angular.module(jcs.modules.task.name, [
        'ngRoute'
    ]);


}(angular, jcs));