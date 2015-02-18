(function (angular, jcs) {
    'use strict';

    angular.module(jcs.modules.auth.name).factory(jcs.modules.auth.services.authentication, [
        '$q',
        '$timeout',
        'eventbus',
        '$http',
        function ($q, $timeout, eventbus, $http) {
            var currentUser,
                createUser = function (name, permissions) {
                    return {
                        name: name,
                        permissions: permissions
                    };
                },
                login = function (email, password) {

                    var userstore = [];
                    $http.get('db.json').then(function (a) {
                        userstore = a.data;
                    });

                    var defer = $q.defer();

                    // only here to simulate a network call, warte 1 sekunde
                    $timeout(function () {
                        email = email.toLowerCase();

                        //Adrian Ryser: lesen der User aus dem Json (userstore) und wenn Login ok, user mit rolle im modell erzeugen.
                        for (var user in userstore.user) {
                            if (email == userstore.user[user].email && password == userstore.user[user].password) {
                                currentUser = createUser(userstore.user[user].name, userstore.user[user].permissions);
                                break;
                            } else {
                                //Reject, Login hat nicht funktioniert
                                defer.reject('Unknown Username / Password combination');
                                return;
                            }
                        }

                        //Alles ok
                        eventbus.broadcast(jcs.modules.auth.events.userLoggedIn, currentUser);
                        defer.resolve(currentUser);

                    }, 1000);

                    //gib das versprechen, dass noch was kommt
                    return defer.promise;
                },

                logout = function () {
                    //Logout ist einfach gemacht ohne promise und zeitverzögerung
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