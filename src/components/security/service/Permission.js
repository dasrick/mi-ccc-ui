'use strict';

/**
 * @ngInject
 */
module.exports = function (User) {
  return {
    hasRole: function (roleName) {
      var user;
      user = User.getCurrentUser();
      if (!user) {
        return false;
      }
      return user.reachableRoles.indexOf(roleName) > -1;
    },
    hasType: function (typeName) {
      var user;
      user = User.getCurrentUser();
      if (!user) {
        return false;
      }
      return user.customer.type === typeName;
    }
  };
};
