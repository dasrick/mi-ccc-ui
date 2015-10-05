'use strict';

/**
 * @ngInject
 */
module.exports = function ($scope, DS, $state, Assignment, Duration, $rootScope, $translate) {
  var deregistration;
  $scope.lang = $translate.use();
  $scope.addAssignment = {};
  $scope.additionalAssignmentsForm = {};
  $scope.additionalAssignmentsForm.isShown = false;
  DS.find('assignment', $state.params.assignmentId, {
    bypassCache: true
  }).then(function (detail) {
    var endDate, now, startDate;
    now = (new Date()).getTime();
    startDate = new Date(detail.duration.startDate).getTime();
    endDate = new Date(detail.duration.endDate).getTime();
    if ((startDate < now && now < endDate) && !detail.inactive) {
      $scope.durationType = 'active';
    }
    if (now > endDate || detail.inactive) {
      $scope.durationType = 'inactive';
    }
    if (now < startDate && !detail.inactive) {
      $scope.durationType = 'future';
    }
  });
  DS.bindOne($scope, 'detail', 'assignment', $state.params.assignmentId);
  $scope.$on('cache_clear_assignment', function () {
    DS.find('assignment', $state.params.assignmentId);
  });
  $scope.reset = function () {
    $scope.addAssignment = {};
  };
  $scope.reactivate = function (assignment, type) {
    $scope.addAssignment.duration = Duration.setValidDuration(assignment.duration);
    switch (type) {
      case 'plan':
        $scope.addAssignment.plan = assignment.plan.id;
        break;
      case 'feature':
        $scope.addAssignment.feature = assignment.feature.id;
    }
    $scope.additionalAssignmentsForm.isShown = true;
  };
  $scope.deactivate = function (id, type) {
    Assignment.deactivateAdditionalAssignment(id, type).then(function () {
      $scope.$emit('alert', 'success', "assignment.additional_" + type + ".deactivate.success");
    });
  };
  $scope.deactivateAssignment = function (id) {
    DS.find('assignment', id).then(function () {
      DS.destroy('assignment', id).then(function () {
        $scope.$emit('alert', 'success', 'assignment.deactivate.success');
      });
    });
  };
  $scope.refreshAssignment = function (id) {
    DS.find('assignment', id).then(function () {
      Assignment.refresh().then(function () {
        $scope.$emit('alert', 'success', 'assignment.refresh.success');
      });
    });
  };
  deregistration = $rootScope.$on('$stateChangeSuccess', function () {
    $scope.reset();
  });
  $scope.$on('$destroy', function () {
    deregistration();
  });
  $scope.create = function (type) {
    $scope.addAssignment.type = type;
    Assignment.addAdditionalAssignment($scope.addAssignment, type).then(function () {
      $scope.reset();
      $scope.additionalAssignmentsForm.isShown = false;
    });
  };
};
