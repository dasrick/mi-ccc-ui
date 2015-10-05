'use strict';

/**
 * @ngInject
 */
module.exports = function ($state, $rootScope) {
  return {
    restrict: 'A',
    link: function (scope, elem, attrs) {
      var changeClass, stateName;
      changeClass = function (stateName) {
        if (scope.isInBaseState == null) {
          scope.isInBaseState = {};
        }
        if ((attrs.exclude != null) && stateName.indexOf(attrs.isInBaseState) === 0 && stateName.indexOf(attrs.exclude) !== -1) {
          scope.isInBaseState[attrs.isInBaseState] = false;
        } else {
          scope.isInBaseState[attrs.isInBaseState] = stateName.indexOf(attrs.isInBaseState) === 0;
        }
      };
      $rootScope.$on('$stateChangeStart', function (event, toState) {
        changeClass(toState.name);
      });
      stateName = $state.current.name;
      changeClass(stateName);
    }
  };
};
