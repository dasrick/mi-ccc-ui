'use strict';

/**
 * @ngInject
 */
module.exports = function ($scope, $rootScope, $translate) {
  $scope.alerts = [];
  $rootScope.$on('alert', function (event, alertType, alertMsg, errorData) {
    var alertId;
    if (alertType == null) {
      alertType = 'danger';
    }
    if ((alertMsg == null) && (errorData != null)) {
      alertMsg = '';
      if (errorData.status != null) {
        alertMsg = errorData.status.toString();
      } else if ((errorData.data != null) && (errorData.data.code != null)) {
        alertMsg = errorData.data.code.toString();
      }
      if ((errorData.data != null) && (errorData.data.message != null)) {
        alertMsg += " - " + errorData.data.message;
      }
    }
    if ((alertMsg != null) && alertMsg.length > 0) {
      alertId = (new Date()).getTime();
      $scope.alerts.push({
        id: alertId,
        type: alertType,
        msg: $translate.instant(alertMsg)
      });
    }
  });
  $scope.closeAlert = function (index) {
    $scope.alerts.splice(index, 1);
  };
};
