'use strict';

/**
 * @ngInject
 */
module.exports = function ($scope, $state, DS) {
  var getDetail;
  getDetail = function () {
    DS.find('transcoder_profile', $state.params.id, {
      bypassCache: true
    }).then(function (value) {
      $scope.transcoderprofile = value;
    });
  };
  $scope.$on('cache_clear_transcoder_profile', function () {
    getDetail();
  });
  getDetail();
  $scope.save = function () {
    if ($scope.transcoderprofile.custom == null) {
      $scope.transcoderprofile.custom = false;
    }
    $scope.transcoderprofile.keyPrefix = $scope.transcoderprofile.key;
    DS.update('transcoder_profile', $scope.transcoderprofile.key, $scope.transcoderprofile, {
      cacheResponse: false
    }).then(function () {
      $state.go('^.^.list');
    }, function (error) {
      console.log(error);
    });
  };
};
