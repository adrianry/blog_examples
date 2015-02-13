(function (angular, jcs) {
    'use strict';

    angular.module(jcs.modules.auth.name).factory(jcs.modules.auth.services.authentication, [
        '$q',
        '$timeout',
        'eventbus',
        function ($q, $timeout, eventbus) {
            var currentUser,
                createUser = function (name, permissions) {
                    return {
                        name: name,
                        permissions: permissions
                    };
                },
                login = function (email, password) {
                    var defer = $q.defer();

                    // only here to simulate a network call!!!!!
                    $timeout(function () {
                        // for the sake of the demo this is hard code
                        // however this would always be a call to the server.
                        email = email.toLowerCase();
                        if (email === 'admin@test.com' &&
                            password === "admin")
                        {
                            currentUser = createUser('Admin User', ['Admin']);
                        } else if (
                            email === 'manager@test.com'  &&
                            password === "manager")
                        {
                            currentUser = createUser('Manager User', ['UserManager']);
                        } else if (
                            email === 'user@test.com' &&
                            password === "user"
                        ) {
                            currentUser = createUser('Normal User', ['User']);
                        } else {
                            defer.reject('Unknown Username / Password combination');
                            return;
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
                    eventbus.broadcast(jcs.modules.auth.events.userLoggedOut,currentUser);
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