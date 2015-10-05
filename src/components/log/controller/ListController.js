'use strict';

/**
 * @ngInject
 */
module.exports = function ($scope, DS) {
  var filter, orderBy;
  DS.findAll('log', {}).then(function (logs) {
    var filteredLogs;
    $scope.logs = logs;
    filteredLogs = DS.filter('log', {
      orderBy: ['loggedAt', 'ASC']
    });
    if (angular.isArray(filteredLogs) && filteredLogs.length > 0) {
      $scope.actualMinDate = filteredLogs[0].loggedAt;
    }
  });
  orderBy = [];
  filter = {};
  $scope.openStartDate = function ($event) {
    $event.preventDefault();
    $event.stopPropagation();
    $scope.openedStartDate = true;
  };
  $scope.openEndDate = function ($event) {
    $event.preventDefault();
    $event.stopPropagation();
    $scope.openedEndDate = true;
  };
  $scope.$watchCollection('filter', function (newValue) {
    var key, value;
    if (newValue != null) {
      filter = {};
      for (key in newValue) {
        value = newValue[key];
        if (value != null) {
          switch (key) {
            case 'startDate':
              if (filter.loggedAt == null) {
                filter.loggedAt = {};
              }
              filter.loggedAt['>='] = value;
              break;
            case 'endDate':
              if (filter.loggedAt == null) {
                filter.loggedAt = {};
              }
              filter.loggedAt['<='] = value.setDate(value.getDate() + 1);
              break;
            default:
              filter[key] = {
                '==': value
              };
          }
        }
      }
      $scope.logs = DS.filter('log', {
        where: filter,
        orderBy: orderBy
      });
    }
  });
  $scope.$watchCollection('orderData', function (newValue) {
    var key, value;
    if (newValue != null) {
      orderBy = [];
      for (key in newValue) {
        value = newValue[key];
        if (value.length > 0) {
          orderBy = [key, value.toUpperCase()];
        }
      }
      $scope.logs = DS.filter('log', {
        orderBy: orderBy,
        where: filter
      });
    }
  });
};
