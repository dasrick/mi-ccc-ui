'use strict';

/**
 * @ngInject
 */
module.exports = function ($scope, DS, $state, Assignment) {
  DS.find('assignment', $state.params.assignmentId).then(function (assignment) {
    $scope.assignment = assignment;
    $scope.actualMinEndDate = new Date(assignment.duration.endDate);
    $scope.actualMinEndDate.setDate($scope.actualMinEndDate.getDate() + 1);
  });
  $scope.renew = function () {
    $scope.duration.startDate = new Date();
    Assignment.renew($scope.duration).then(function () {
      $state.go('^.^.list');
    });
  };
  $scope.reset = function () {
    $scope.duration = {};
  };
  $scope.openEndDate = function ($event) {
    $event.preventDefault();
    $event.stopPropagation();
    $scope.openedEndDate = true;
  };
};
