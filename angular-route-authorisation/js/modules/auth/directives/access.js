(function (angular, jcs) {
    'use strict';

    angular.module(jcs.modules.auth.name).directive('access', [
        jcs.modules.auth.services.authorization,
        function (authorization) {
            return {
              restrict: 'A',
              link: function (scope, element, attrs) {
                  var makeVisible = function () {
                          element.removeClass('hidden');
                      },
                      makeHidden = function () {
                          element.addClass('hidden');
                      },
                      determineVisibility = function (resetFirst) {
                          var result;
                          //zurücksetzen aller elemente auf visible
                          if (resetFirst) {
                              makeVisible();
                          }

                          //var accessPermissionType;
                          //if(attrs.accessPermissionType === jcs.modules.auth.enums.permissionCheckType.combinationRequired) accessPermissionType = jcs.modules.auth.enums.permissionCheckType.combinationRequired;
                         // if(attrs.accessPermissionType === jcs.modules.auth.enums.permissionCheckType.atLeastOne) accessPermissionType = jcs.modules.auth.enums.permissionCheckType.atLeastOne;
                          //laden ob benutzer berechtigt ist das element zu sehen.
                          result = authorization.authorize(true, roles, attrs.accessPermissionType);

                          //wenn benutzer darf, dann hat result den wert 0.
                          if (result === jcs.modules.auth.enums.authorised.authorised) {
                              makeVisible();
                          } else {
                              makeHidden();
                          }
                      },
                      roles = attrs.access.split(',');


                  if (roles.length > 0) {
                      determineVisibility(true);
                  }
              }
            };
        }]);
}(angular, jcs));