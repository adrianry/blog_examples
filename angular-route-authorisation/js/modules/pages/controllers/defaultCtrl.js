(function (angular, jcs) {
    'use strict';

    angular.module(jcs.modules.pages.name)
        .controller(jcs.modules.pages.controllers.default, [
            '$scope',
            '$location',
            '$route',
            '$routeParams',
            function ($scope, $location, $route, $routeParams) {
                $scope.adi = "Hallo Adi";
                $scope.$location = $location;
                $scope.$route = $route;
                $scope.$routeParams = $routeParams;
            }
    ]);
}(angular, jcs));