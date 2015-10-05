'use strict';

/**
 * @ngInject
 */
module.exports = function ($scope, DS, PlayerSkinService) {
  var params;
  params = {
    type: 'all'
  };
  DS.findAll('player_skin', params);
  DS.bindAll($scope, 'playerSkins', 'player_skin', {});
  $scope.$on('cache_clear_player_skin', function () {
    DS.findAll('player_skin', params, {
      bypassCache: true
    });
  });
  $scope["delete"] = function (id) {
    DS.destroy('player_skin', id);
  };
  $scope.deactivate = function (id, reviewer) {
    PlayerSkinService.deactivate(id, reviewer).then(function () {
      $scope.$emit('alert', 'info', 'review.start_review.deactivate');
    });
  };
};
