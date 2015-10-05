'use strict';

/**
 * @ngInject
 */
module.exports = function () {
  return {
    restrict: 'A',
    link: function (scope, element) {
      element.bind('click', function () {
        angular.element(document.getElementById('login')).triggerHandler('click');
      });
    }
  };
};
