/**
 * Created by Adrian on 14.02.2015.
 */
(function (angular, jcs) {
    'use strict';

    angular.module(jcs.modules.auth.name).controller(jcs.modules.auth.controllers.logout, [
        '$scope',
        '$rootScope',
        '$location',
        jcs.modules.auth.services.authentication,
        function ($scope, $rootScope, $location, authentication) {
            //Event Listener
            $rootScope.$on(jcs.modules.auth.events.userLoggedOut, function() {
                alert('Sie wurden erfolgreich abgemeldet. Sie werden zur Startseite weitergeleitet.');
            });

            //Buttonsteuerung
            $scope.nologout = true;
            var currentuser = authentication.getCurrentLoginUser();
            $scope.currentuser = currentuser;
            if(currentuser !== undefined)$scope.nologout = false;
            //Logout Funktion
            $scope.logout = function () {
                authentication.logout();
                $location.path(jcs.modules.pages.routes.home);
            };
        }
    ]);
}(angular, jcs));