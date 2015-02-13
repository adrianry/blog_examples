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
            $scope.logout = function () {
                $scope.isBusy = true;
                $scope.CurrentLoginUser = authentication.getCurrentLoginUser();
                authentication.logout().then(function () {
                    $location.path(jcs.modules.pages.routes.home);
                }, function () {
                    $scope.invalidLogin = true;
                })['finally'](function () {
                    $scope.isBusy = false;
                });
            };
        }
    ]);
}(angular, jcs));