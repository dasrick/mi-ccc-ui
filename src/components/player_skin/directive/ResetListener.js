'use strict';

var _ = require('lodash');
/**
 * @ngInject
 */
module.exports = function () {

  var master;

  return {
    restrict: 'A',
    link: function (scope, elem, attrs) {
      scope.$watch(attrs.resetListener,
        function (newValue) {
          if (master == null) {
            master = angular.copy(newValue);
          }
          if (_.isEqual(newValue, master)) {
            elem[0].value = '';
          }
        });
    }
  };
};
