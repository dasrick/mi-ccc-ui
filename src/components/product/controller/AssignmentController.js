'use strict';

/**
 * @ngInject
 */
module.exports = function ($scope, DS, $state) {
  var params;
  params = {};
  switch ($state.params.type) {
    case 'product':
      params.product = $state.params.id;
      DS.find('product', $state.params.id);
      DS.bindOne($scope, 'product', 'product', $state.params.id);
      break;
    case 'feature':
      params.feature = $state.params.id;
      DS.find('feature', $state.params.id);
      DS.bindOne($scope, 'product', 'feature', $state.params.id);
  }
  DS.findAll('assignment', params, {
    bypassCache: true,
    cacheResponse: false
  }).then(function (assignments) {
    $scope.assignments = assignments;
  });
};
