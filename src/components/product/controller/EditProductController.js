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
  DS.find('product', $state.params.id, {
    bypassCache: true
  }).then(function (product) {
    var feature, features, _i, _len, _ref;
    $scope.product = angular.copy(product);
    features = [];
    _ref = $scope.product.features;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      feature = _ref[_i];
      if (feature.id != null) {
        features.push(feature.id);
      }
    }
    if (features.length > 0) {
      $scope.product.features = features;
    }
    $scope.productMaster = angular.copy($scope.product);
  });
  $scope.reset = function () {
    $scope.product = angular.copy($scope.productMaster);
  };
  $scope.edit = function (reviewer) {
    var data, product;
    product = angular.copy($scope.product);
    data = {
      product: product,
      review: {
        reviewer: reviewer,
        baseUrl: $state.href("profile.reviews.detail", {}, {
          absolute: true
        })
      }
    };
    DS.update('product', $state.params.id, data, {
      cacheResponse: false
    }).then(function () {
      $scope.$emit('alert', 'info', 'review.start_review.edit');
      $state.go('^.^.list');
    });
  };
};
