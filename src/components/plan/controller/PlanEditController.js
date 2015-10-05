'use strict';

/**
 * @ngInject
 */
module.exports = function ($scope, DS, $state, PLAN_UNITS) {
  $scope.plan = {};
  $scope.units = PLAN_UNITS;
  DS.find('plan', $state.params.id, {
    bypassCache: true
  }).then(function (plan) {
    $scope.plan = plan;
    $scope.showHosting = plan.hosting != null;
    $scope.showTraffic = plan.traffic != null;
    $scope.showUser = plan.user != null;
    $scope.planMaster = angular.copy($scope.plan);
  });
  $scope.deleteEntry = function (key) {
    $scope.plan[key] = null;
  };
  $scope.reset = function () {
    $scope.plan = angular.copy($scope.planMaster);
  };
  $scope.edit = function (reviewer) {
    var data, plan;
    plan = angular.copy($scope.plan);
    data = {
      plan: plan,
      review: {
        reviewer: reviewer,
        baseUrl: $state.href("profile.reviews.detail", {}, {
          absolute: true
        })
      }
    };
    DS.update('plan', $state.params.id, data, {
      cacheResponse: false
    }).then(function () {
      $scope.$emit('alert', 'info', 'review.start_review.edit');
      $state.go('^.^.list');
    });
  };
};
