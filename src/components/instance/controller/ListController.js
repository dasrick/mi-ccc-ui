'use strict';

/**
 * @ngInject
 */
module.exports = function (VmproInstanceService, $scope) {

  $scope.vmproInstances = [];
  var getVmproInstances;
    getVmproInstances = function () {
    VmproInstanceService.all('all').then(function (vmproInstances) {
      $scope.vmproInstances = vmproInstances;
    });
  };
  getVmproInstances();

  $scope['delete'] = function (id) {
    VmproInstanceService.delete(id).then(function () {
      getVmproInstances();
    });
  };

  $scope.deactivate = function (id, reviewer) {
    VmproInstanceService.deactivate(id, reviewer).then(function () {
      getVmproInstances();
      $scope.$emit('alert', 'info', 'review.start_review.deactivate');
    });
  };
};
