(function (angular, jcs) {
    'use strict';

angular.module(jcs.modules.auth.name).factory(jcs.modules.auth.services.authorization, [
    'authentication',
    function (authentication) {
     var authorize = function (loginRequired, requiredPermissions, permissionCheckType) {
         //init vars
         var  result = jcs.modules.auth.enums.authorised.authorised; //optimistisch
         var  user = authentication.getCurrentLoginUser();
         var  loweredPermissions = [];
         var  hasPermission = true;
         var  permission;
         var  i;

        permissionCheckType = permissionCheckType || jcs.modules.auth.enums.permissionCheckType.atLeastOne;
        if (loginRequired === true && user === undefined) {
            result = jcs.modules.auth.enums.authorised.loginRequired;
        } else if ((loginRequired === true && user !== undefined) &&
            (requiredPermissions === undefined || requiredPermissions.length === 0)) {
            // Login is required but no specific permissions are specified.
            result = jcs.modules.auth.enums.authorised.authorised;
        } else if (requiredPermissions) {
            loweredPermissions = [];
            angular.forEach(user.permissions, function (permission) {
                loweredPermissions.push(permission.toLowerCase());
            });

            for (i = 0; i < requiredPermissions.length; i += 1) {
                permission = requiredPermissions[i].toLowerCase();

                if (permissionCheckType === jcs.modules.auth.enums.permissionCheckType.combinationRequired) {
                    hasPermission = hasPermission && loweredPermissions.indexOf(permission) > -1;
                    // if all the permissions are required and hasPermission is false there is no point carrying on
                    if (hasPermission === false) {
                        break;
                    }
                } else if (permissionCheckType === jcs.modules.auth.enums.permissionCheckType.atLeastOne) {
                    hasPermission = loweredPermissions.indexOf(permission) > -1;
                    // if we only need one of the permissions and we have it there is no point carrying on
                    if (hasPermission) {
                        break;
                    }
                }
            }

            //hasPermission entweder 0 oder 2
            result = hasPermission ? jcs.modules.auth.enums.authorised.authorised : jcs.modules.auth.enums.authorised.notAuthorised;
        }

        return result;
    };

    return {
     authorize: authorize
    };
    }]);
}(angular, jcs));