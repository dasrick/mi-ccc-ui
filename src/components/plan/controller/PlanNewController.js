'use strict';

/**
 * @ngInject
 */
module.exports = function ($scope, DS, $state, PLAN_UNITS) {
  $scope.plan = {};
  $scope.units = PLAN_UNITS;
  $scope.deleteEntry = function (key) {
    delete $scope.plan[key];
  };
  $scope.reset = function () {
    $scope.plan = {};
  };
  $scope.create = function () {
    DS.create('plan', $scope.plan, {
      cacheResponse: false
    }).then(function () {
      $state.go('^.list');
    });
  };
};
