'use strict';

/**
 * @ngInject
 */
module.exports = function () {
  return {
    restrict: 'E',
    templateUrl: 'views/assignment/duration.html',
    replace: true,
    scope: {
      assignment: '=ngModel',
      form: '='
    },
    link: function (scope) {
      var dt;
      if (scope.assignment == null) {
        scope.assignment = {};
      }
      scope.openStartDate = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();
        scope.openedStartDate = true;
      };
      scope.openEndDate = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();
        scope.openedEndDate = true;
      };
      dt = new Date();
      scope.actualMinStartDate = new Date();
      scope.actualMinEndDate = dt;
      scope.actualMinEndDate.setDate(dt.getDate() + 1);
    }
  };
};
