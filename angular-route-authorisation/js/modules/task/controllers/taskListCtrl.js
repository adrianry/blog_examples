(function (angular, jcs) {
    'use strict';

    angular.module(jcs.modules.task.name).controller(jcs.modules.task.controllers.task, ['$scope',
        function ($scope) {
            $scope.permissionCheckType = jcs.modules.auth.enums.permissionCheckType;
        }
    ]);
}(angular, jcs));