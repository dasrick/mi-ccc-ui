'use strict';

var _ = require('lodash');
/**
 * @ngInject
 */
module.exports = function ($scope, DS) {
  $scope.$watch('detail', function (detail) {
    var existingFeatures, feature, _i, _len, _ref;
    if (detail != null) {
      existingFeatures = [];
      if ((detail.product != null) && angular.isArray(detail.product.features)) {
        _ref = detail.product.features;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          feature = _ref[_i];
          existingFeatures.push(feature.id);
        }
      }
      DS.findAll('feature', {}).then(function (features) {
        var filteredFeatures, _j, _len1;
        filteredFeatures = [];
        for (_j = 0, _len1 = features.length; _j < _len1; _j++) {
          feature = features[_j];
          if (!_.contains(existingFeatures, feature.id)) {
            filteredFeatures.push(feature);
          }
        }
        $scope.features = filteredFeatures;
      });
    }
  });
};
