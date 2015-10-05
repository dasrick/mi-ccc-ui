'use strict';

var _ = require('lodash');
/**
 * @ngInject
 */
module.exports = function ($scope, DS, $translate, Assignment) {
  var filter, params;
  $scope.lang = $translate.use();
  $scope.skin = {};
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
  DS.findAll('player_skin', params).then(function () {
    $scope.$watch('detail', function (detail) {
      var ids, skin, _i, _j, _len, _len1, _ref, _ref1, _results;
      if (detail != null) {
        ids = [];
        _ref = detail.playerSkins;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          skin = _ref[_i];
          ids.push(skin.id);
        }
        $scope.playerSkins = [];
        _ref1 = DS.filter('player_skin', filter);
        _results = [];
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          skin = _ref1[_j];
          if (!_.contains(ids, skin.id)) {
            _results.push($scope.playerSkins.push(skin));
          }
        }
        _results;
      }
    });
  });
  $scope.addCustomPlayerSkin = function (playerSkin) {
    Assignment.addPlayerSkin(playerSkin).then(function () {
      $scope.additionalAssignmentsForm.isShown = false;
      $scope.resetForm();
    });
  };
  $scope.resetForm = function () {
    $scope.skin = {};
  };
};
