'use strict';

/**
 * @ngInject
 */
module.exports = function ($scope, $modalInstance, exclude, DS, right) {
  DS.findAll('reviewer', {
    exclude: exclude,
    action: right
  });
  DS.bindAll($scope, 'userList', 'reviewer', {}, function () {
    $scope.isList = angular.isArray($scope.userList) && $scope.userList.length > 0;
  });
  $scope.ok = function () {
    var ids;
    if (!angular.isArray($scope.reviewer)) {
      $scope.reviewer = [$scope.reviewer];
    }
    ids = [];
    angular.forEach($scope.reviewer, function (reviewer) {
      ids.push(reviewer.id);
    });
    $modalInstance.close(ids);
  };
  $scope.cancel = function () {
    $modalInstance.dismiss();
  };
};
