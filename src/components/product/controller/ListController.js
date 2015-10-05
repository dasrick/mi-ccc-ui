'use strict';

/**
 * @ngInject
 */
module.exports = function ($scope, DS, ProductService) {
  var getProductsAndFeatures;
  getProductsAndFeatures = function () {
    var params;
    params = {
      type: 'all'
    };
    DS.findAll('product', params);
    DS.findAll('feature', {});
  };
  getProductsAndFeatures();
  DS.bindAll($scope, 'products', 'product', {});
  DS.bindAll($scope, 'features', 'feature', {});
  $scope.$on('cache_clear_product', function () {
    getProductsAndFeatures();
  });
  $scope.$on('cache_clear_feature', function () {
    getProductsAndFeatures();
  });
  $scope.deleteProduct = function (id) {
    DS.destroy('product', id);
  };
  $scope.deleteFeature = function (id) {
    DS.destroy('feature', id);
  };
  $scope.deactivateProduct = function (id, reviewer) {
    ProductService.deactivateProduct(id, reviewer).then(function () {
      $scope.$emit('alert', 'info', 'review.start_review.deactivate');
    });
  };
  $scope.deactivateFeature = function (id, reviewer) {
    ProductService.deactivateFeature(id, reviewer).then(function () {
      $scope.$emit('alert', 'info', 'review.start_review.deactivate');
    });
  };
};
