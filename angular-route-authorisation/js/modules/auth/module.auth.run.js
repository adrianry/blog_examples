(function (angular, jcs) {
    'use strict';

angular.module(jcs.modules.auth.name).run([
    '$rootScope',
    '$location',
    jcs.modules.auth.services.authorization,

    //TODO: hier könnte man den login machen, wenn per zertifikat eingeloggt wird. quasi als init für das berechtigungsmodul.
/*
Beispiel des Zusatzobjekts Access für Route:
Wird im event $routeChangeStart ausgelesen und die route unterbrochen bis prüfung beendet. resultat umleitung zum ziel oder loginseite oder errorseite.
 access: {
    loginRequired: true,
    permissions: ['zeigeTask','TaskAdmin'],
    permissionType: 'AtLeastOne'
 }
 */
    function ($rootScope, $location, authorization) {
        var routeChangeRequiredAfterLogin = false,
            loginRedirectUrl;
        $rootScope.$on('$routeChangeStart', function (event, next, prev) {
            var authorised;
            //Adrian Ryser: Fix "prev.originalPath !== jcs.modules.auth.routes.login" ansonsten wird nach nochmaligem klicken des link ohne login geroutet.
            if (routeChangeRequiredAfterLogin && prev.originalPath !== jcs.modules.auth.routes.login && next.originalPath !== jcs.modules.auth.routes.login) {
                routeChangeRequiredAfterLogin = false;
                $location.path(loginRedirectUrl).replace();
            } else if (next.access !== undefined) {
                authorised = authorization.authorize(next.access.loginRequired,
                                                     next.access.permissions,
                                                     next.access.permissionCheckType);
                if (authorised === jcs.modules.auth.enums.authorised.loginRequired) {
                    routeChangeRequiredAfterLogin = true;
                    loginRedirectUrl = next.originalPath;
                    $location.path(jcs.modules.auth.routes.login);
                } else if (authorised === jcs.modules.auth.enums.authorised.notAuthorised) {
                    $location.path(jcs.modules.auth.routes.notAuthorised).replace();
                }
            }
        });
        $rootScope.$on('$routeUpdate', function () {
            console.log("routeUpdate wurde geloggt.");
        });
    }]);
}(angular, jcs));