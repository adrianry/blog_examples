(function (angular, jcs) {
    'use strict';

    angular.module(jcs.modules.auth.name).controller(jcs.modules.auth.controllers.login, [
        '$scope',
        '$location',
        jcs.modules.auth.services.authentication,
        function ($scope, $location, authentication) {
            $scope.loginModel = {};
            $scope.isBusy = false;
            $scope.invalidLogin = false;

            $scope.login = function () {
                $scope.invalidLogin = false;
                $scope.isBusy = true;
                authentication.login($scope.loginModel.email, $scope.loginModel.password).then(function () {
                    //Promise erfüllt, Alle ok, es geht weiter
                    $location.path(jcs.modules.pages.routes.home);
                }, function () {
                    //Reject Login war nicht erfolgreich
                    $scope.invalidLogin = true;
                })['finally'](function () {
                    //das tun wir immer
                    $scope.isBusy = false;
                });
            };
        }
    ]);
}(angular, jcs));