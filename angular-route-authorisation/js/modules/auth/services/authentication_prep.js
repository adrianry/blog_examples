(function (angular, jcs) {
    'use strict';

    //factory als service singleton
    angular.module(jcs.modules.auth.name).factory(jcs.modules.auth.services.authentication, [
        'eventbus',
        function (eventbus) {
            var currentUser,
                //usermodell muss erweitert werden
                createUser = function (name, permissions) {
                    return {
                        name: name,
                        permissions: permissions
                    };
                },

            //authentication.login()
            //login muss anstelle von login page aufgerufen werden. z.B. von main modul.run beim bootstrap der app
                login = function () {
                    currentUser = createUser("SuperUser", ["zeigeEinstellungen","bearbeiteEinstellungen","loescheEinstellungen"]);
                    eventbus.broadcast(jcs.modules.auth.events.userLoggedIn, currentUser);
                },

                logout = function () {
                    currentUser = undefined;
                    eventbus.broadcast(jcs.modules.auth.events.userLoggedOut, currentUser);
                },

                getCurrentLoginUser = function () {
                    return currentUser;
                };

            return {
                login: login,
                logout: logout,
                getCurrentLoginUser: getCurrentLoginUser
            };
        }
    ]);
}(angular, jcs));