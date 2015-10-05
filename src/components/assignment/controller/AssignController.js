'use strict';

var _ = require('lodash');
/**
 * @ngInject
 */
module.exports = function ($scope, DS, $state, VmproInstanceService) {
  var dt, filter;
  $scope.selectedPlans = [];
  $scope.assignment = {
    customer: {
      id: $state.params.customerId
    },
    permanentlyDeleteVideosAllowed: true
  };
  filter = {
    where: {
      active: {
        '==': true
      }
    }
  };
  DS.findAll('product', {});
  DS.bindAll($scope, 'products', 'product', filter);
  DS.findAll('plan', {});
  DS.bindAll($scope, 'plans', 'plan', {});

  $scope.vmproInstances = [];
  var getVmproInstances;
  getVmproInstances = function () {
    VmproInstanceService.all('all').then(function (vmproInstances) {
      $scope.vmproInstances = vmproInstances;
    });
  };
  getVmproInstances();

  $scope.reset = function () {
    $scope.assignment = {
      customer: $state.params.customerId
    };
  };
  $scope.openStartDate = function ($event, key) {
    $event.preventDefault();
    $event.stopPropagation();
    $scope.openedStartDate = [];
    $scope.openedStartDate[key] = true;
  };
  $scope.openEndDate = function ($event, key) {
    $event.preventDefault();
    $event.stopPropagation();
    $scope.openedEndDate = [];
    $scope.openedEndDate[key] = true;
  };
  dt = new Date();
  $scope.actualMinStartDate = new Date();
  $scope.actualMinEndDate = dt;
  $scope.actualMinEndDate.setDate(dt.getDate() + 1);
  $scope.create = function () {
    var assignment;
    assignment = angular.copy($scope.assignment);
    assignment.plans = _.compact(assignment.plans);
    DS.create('assignment', assignment, {
      cacheResponse: false
    }).then(function () {
      $state.go('^.list');
    });
  };
  $scope.enablePlan = function (plan, key) {
    if (!angular.isArray($scope.assignment.plans)) {
      $scope.assignment.plans = [];
    }
    if ($scope.assignment.plans[key] != null) {
      delete $scope.assignment.plans[key];
    } else {
      $scope.assignment.plans[key] = {
        plan: {
          id: plan.id
        }
      };
    }
  };
};
