/**
 * Created by tp80 on 09.03.2015.
 */
(function (angular, jcs) {
    'use strict';

    angular.module(jcs.modules.core.name).factory(jcs.modules.core.services.usermodel, [
        '$http',
        '$q',
        function ($http,$q) {

                var getmodel = function () {

                    var defer = $q.defer();

                    var userstore = [];

                    $http.get('db.json').then(function (a) {
                        userstore = a.data;
                        defer.resolve(userstore);
                    });

                    return defer.promise;
                };

            return {
                getmodel: getmodel
            };
        }
    ]);
}(angular, jcs));