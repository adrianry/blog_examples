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

                    var users = [];
                    $http.get('db.json').then(function (a) {
                        users = a.data;
                    });

                    var defer = $q.defer();

                    // only here to simulate a network call!!!!!
                    $timeout(function () {
                        email = email.toLowerCase();

                        //Adrian Ryser: lesen der User aus dem Json und wenn Login ok, user mit rolle im modell erzeugen.
                        for (var user in users.user) {
                            if (email == users.user[user].email && password == users.user[user].password) {
                                currentUser = createUser(users.user[user].name, users.user[user].rolle);
                                break;
                            } else {
                                defer.reject('Unknown Username / Password combination');
                                return;
                            }
                        }

                        defer.resolve(currentUser);

                        eventbus.broadcast(jcs.modules.auth.events.userLoggedIn, currentUser);
                    }, 1000);

                    return defer.promise;
                },
                logout = function () {
                    // we should only remove the current user.
                    // routing back to login login page is something we shouldn't
                    // do here as we are mixing responsibilities if we do.
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