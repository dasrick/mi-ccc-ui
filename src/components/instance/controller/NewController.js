'use strict';

/**
 * @ngInject
 */
module.exports = function (VmproInstanceService, $scope, $state) {
  $scope.vmproInstance = {};
  $scope.save = function () {
    VmproInstanceService.create($scope.vmproInstance).then(function () {
      $state.go('^.list');
    });
  };
};
