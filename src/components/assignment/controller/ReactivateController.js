'use strict';

var _ = require('lodash');
/**
 * @ngInject
 */
module.exports = function ($scope, DS, $state, Duration) {
  var dt, filter;
  $scope.additionalFeatures = [];
  $scope.selectedPlans = [];
  DS.find('assignment', $state.params.assignmentId).then(function (assignment) {
    var existingFeatures, feature, _i, _len, _ref;
    $scope.assignment = {
      product: {
        id: assignment.product.id
      },
      customer: {
        id: assignment.customer.id
      }
    };
    existingFeatures = [];
    if (angular.isArray(assignment.product.features)) {
      _ref = assignment.product.features;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        feature = _ref[_i];
        existingFeatures.push(feature.id);
      }
    }
    DS.findAll('feature', {}).then(function (features) {
      var filteredFeatures, _j, _len1;
      filteredFeatures = [];
      for (_j = 0, _len1 = features.length; _j < _len1; _j++) {
        feature = features[_j];
        if (!_.contains(existingFeatures, feature.id)) {
          filteredFeatures.push(feature);
        }
      }
      $scope.features = filteredFeatures;
    });
    $scope.assignment.duration = Duration.setValidDuration(assignment.duration);
  });
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
  $scope.openStartDate = function ($event, key) {
    if (key == null) {
      key = null;
    }
    $event.preventDefault();
    $event.stopPropagation();
    $scope.openedStartDate = [];
    if (key != null) {
      $scope.openedStartDate[key] = true;
    } else {
      $scope.openedStartDate = true;
    }
  };
  $scope.openEndDate = function ($event, key) {
    if (key == null) {
      key = null;
    }
    $event.preventDefault();
    $event.stopPropagation();
    $scope.openedEndDate = [];
    if (key != null) {
      $scope.openedEndDate[key] = true;
    } else {
      $scope.openedEndDate = true;
    }
  };
  dt = new Date();
  $scope.actualMinStartDate = new Date();
  $scope.actualMinEndDate = dt;
  $scope.actualMinEndDate.setDate(dt.getDate() + 1);
  $scope.create = function () {
    var assignment;
    assignment = angular.copy($scope.assignment);
    assignment.additionalFeatures = _.compact(assignment.additionalFeatures);
    assignment.plans = _.compact(assignment.plans);
    DS.create('assignment', assignment, {
      cacheResponse: false
    }).then(function () {
      $state.go('^.^.list');
    });
  };
  $scope.enableFeature = function (feature, key) {
    if (!angular.isArray($scope.assignment.additionalFeatures)) {
      $scope.assignment.additionalFeatures = [];
    }
    if ($scope.assignment.additionalFeatures[key] != null) {
      delete $scope.assignment.additionalFeatures[key];
    } else {
      $scope.assignment.additionalFeatures[key] = {
        feature: {
          id: feature.id
        }
      };
    }
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
