'use strict';

/**
 * @ngInject
 */
module.exports = function ($scope, DS, $state) {
  var getAssignments, params;
  $scope.customerId = $state.params.customerId;
  params = {
    customer: $scope.customerId
  };
  getAssignments = function () {
    DS.findAll('assignment', params, {
      bypassCache: true
    }).then(function (assignments) {
      $scope.assignments = assignments;
    });
  };
  getAssignments();
  $scope.$on('cache_clear_assignment', function () {
    getAssignments();
  });
};
