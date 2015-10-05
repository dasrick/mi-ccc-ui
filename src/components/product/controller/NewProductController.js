'use strict';

/**
 * @ngInject
 */
module.exports = function ($scope, DS, PRODUCT_TYPES, AVAILABLE_LANGUAGES, $translate, $state) {
  DS.findAll('feature', {});
  DS.bindAll($scope, 'features', 'feature', {});
  $scope.product = {};
  $scope.language = $translate.use();
  $scope.PRODUCT_TYPES = PRODUCT_TYPES;
  $scope.AVAILABLE_LANGUAGES = AVAILABLE_LANGUAGES;
  $scope.reset = function () {
    var lang, name, product;
    name = {};
    for (lang in $scope.product.name) {
      name[lang] = '';
    }
    product = {
      name: name
    };
    $scope.product = product;
  };
  $scope.create = function () {
    DS.create('product', $scope.product, {
      cacheResponse: false
    }).then(function () {
      $state.go('^.^.list');
    });
  };
};
