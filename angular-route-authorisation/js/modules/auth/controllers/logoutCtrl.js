/**
 * Created by Adrian on 14.02.2015.
 */
(function (angular, jcs) {
    'use strict';

    angular.module(jcs.modules.auth.name).controller(jcs.modules.auth.controllers.logout, [
        '$scope',
        '$location',
        jcs.modules.auth.services.authentication,
        function ($scope, $location, authentication) {
            $scope.nologout = true;
            var currentuser = authentication.getCurrentLoginUser();
            $scope.currentuser = currentuser;
            if(currentuser !== undefined)$scope.nologout = false;
            $scope.logout = function () {
                authentication.logout();
                $location.path(jcs.modules.pages.routes.home);
            };
        }
    ]);
}(angular, jcs));