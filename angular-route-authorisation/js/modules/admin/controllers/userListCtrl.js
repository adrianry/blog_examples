(function (angular, jcs) {
    'use strict';

    angular.module(jcs.modules.admin.name).controller(jcs.modules.admin.controllers.users, ['$scope',
        function ($scope) {
            $scope.permissionCheckType = jcs.modules.auth.enums.permissionCheckType;
        }
    ]);
}(angular, jcs));