'use strict';

/**
 * @ngInject
 */
module.exports = function ($scope, DS, PlanService) {
  DS.findAll('plan', {});
  DS.bindAll($scope, 'plans', 'plan', {});
  $scope.$on('cache_clear_plan', function () {
    DS.findAll('plan', {});
  });
  $scope["delete"] = function (planId, reviewer) {
    PlanService.deletePlan(planId, reviewer).then(function () {
      $scope.$emit('alert', 'info', 'review.start_review.delete');
    });
  };
};
