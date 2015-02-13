(function (angular, jcs) {
    'use strict';

    angular.module(jcs.modules.pages.name)
        .controller(jcs.modules.pages.controllers.default, [
            '$scope',
            '$location',
            '$route',
            '$routeParams',
            jcs.modules.auth.services.authentication,
            function ($scope, $location, $route, $routeParams, authentication) {
                $scope.$location = $location;
                $scope.$route = $route;
                $scope.$routeParams = $routeParams;
                $scope.CurrentLoginUser = authentication.getCurrentLoginUser();
            }
    ]);
}(angular, jcs));