'use strict';

var _ = require('lodash');
/**
 * @ngInject
 */
module.exports = function ($scope, DS, Assignment) {
  var filter, params;
  $scope.profile = {};
  params = {
    type: 'active'
  };
  filter = {
    where: {
      custom: {
        '==': true
      },
      active: {
        '==': true
      }
    }
  };
  DS.findAll('transcoder_profile', params).then(function (transcoder_profile) {
    $scope.$watch('detail', function (detail) {
      var ids, profile, _i, _j, _len, _len1, _ref, _ref1, _results;
      if (detail != null) {
        ids = [];
        _ref = detail.transcoderProfiles;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          profile = _ref[_i];
          ids.push(profile.key);
        }
        $scope.transcoderProfiles = [];
        _ref1 = DS.filter('transcoder_profile', filter);
        _results = [];
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          profile = _ref1[_j];
          if (!_.contains(ids, profile.key)) {
            _results.push($scope.transcoderProfiles.push(profile));
          }
        }
        _results;
      }
    });
  });
  $scope.addCustomTranscoderProfile = function (transcoderProfile) {
    if (transcoderProfile != null) {
      transcoderProfile.keyPrefix = transcoderProfile.key;
    }
    Assignment.addTranscoderProfile(transcoderProfile).then(function () {
      $scope.additionalAssignmentsForm.isShown = false;
      $scope.resetForm();
    });
  };
  $scope.resetForm = function () {
    $scope.profile = {};
  };
};
