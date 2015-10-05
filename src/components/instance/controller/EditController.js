'use strict';

/**
 * @ngInject
 */
module.exports = function (VmproInstanceService, $scope, $state) {
  var getDetail;
  getDetail = function () {
    VmproInstanceService.get($state.params.id).then(function (vmproInstance) {
      $scope.vmproInstance = vmproInstance;
    });
  };
  getDetail();

  $scope.$on('cache_clear_instance', function () {
    getDetail();
  });

  $scope.save = function (reviewer) {
    VmproInstanceService.update($scope.vmproInstance, reviewer).then(function () {
      $scope.$emit('alert', 'info', 'review.start_review.edit');
      $state.go('^.^.list');
    });
  };
};
