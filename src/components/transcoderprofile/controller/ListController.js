'use strict';

/**
 * @ngInject
 */
module.exports = function (TranscoderProfileService, $scope, DS) {
  var params;
  params = {
    type: 'all'
  };
  DS.findAll('transcoder_profile', params);
  DS.bindAll($scope, 'transcoderProfiles', 'transcoder_profile', {});
  $scope.$on('cache_clear_transcoder_profile', function () {
    DS.findAll('transcoder_profile', params, {
      bypassCache: true
    });
  });
  $scope["delete"] = function (id) {
    DS.destroy('transcoder_profile', id);
  };
  $scope.deactivate = function (id, reviewer) {
    TranscoderProfileService.deactivate(id, reviewer).then(function () {
      $scope.$emit('alert', 'info', 'review.start_review.deactivate');
    });
  };
};
