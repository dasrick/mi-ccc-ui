'use strict';

/**
 * @ngInject
 */
module.exports = function (DS, $scope, $state) {
  $scope.transcoderprofile = {};
  $scope.save = function () {
    if ($scope.transcoderprofile.custom == null) {
      $scope.transcoderprofile.custom = false;
    }
    DS.create('transcoder_profile', $scope.transcoderprofile, {
      cacheResponse: false
    }).then(function () {
      $state.go('^.list');
    });
  };
};
