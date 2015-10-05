'use strict';

/**
 * @ngInject
 */
module.exports = function (Permission) {
  return {
    restrict: 'A',
    link: function (scope, elem, attrs) {
      if (scope.hasType == null) {
        scope.hasType = {};
      }
      scope.hasType[attrs.hasType] = Permission.hasType(attrs.hasType);
    }
  };
};
