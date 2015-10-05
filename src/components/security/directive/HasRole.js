'use strict';

/**
 * @ngInject
 */
module.exports = function (Permission) {
  return {
    restrict: 'A',
    link: function (scope, elem, attrs) {
      if (scope.hasRole == null) {
        scope.hasRole = {};
      }
      scope.hasRole[attrs.hasRole] = Permission.hasRole(attrs.hasRole);
    }
  };
};
