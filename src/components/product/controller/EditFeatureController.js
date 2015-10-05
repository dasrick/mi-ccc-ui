'use strict';

/**
 * @ngInject
 */
module.exports = function ($scope, DS, PRODUCT_TYPES, AVAILABLE_LANGUAGES, $translate, $state) {
  $scope.feature = {};
  $scope.language = $translate.use();
  $scope.PRODUCT_TYPES = PRODUCT_TYPES;
  $scope.AVAILABLE_LANGUAGES = AVAILABLE_LANGUAGES;
  DS.find('feature', $state.params.id, {
    bypassCache: true
  }).then(function (feature) {
    $scope.feature = angular.copy(feature);
    $scope.featureMaster = angular.copy($scope.feature);
  });
  $scope.reset = function () {
    $scope.feature = angular.copy($scope.featureMaster);
  };
  $scope.edit = function () {
    var feature;
    feature = angular.copy($scope.feature);
    DS.update('feature', $state.params.id, feature, {
      cacheResponse: false
    }).then(function () {
      $state.go('^.^.list');
    });
  };
  $scope.parseInt = parseInt;

  $scope.add = function () {
    if (!angular.isArray($scope.feature.configurations)) {
      $scope.feature.configurations = [];
    }
    $scope.feature.configurations.push({
      name: "",
      value: ""
    });
  };

  $scope.addCustomConfiguration = function () {
    if (!angular.isArray($scope.feature.customConfigurations)) {
      $scope.feature.customConfigurations = [];
    }
    $scope.feature.customConfigurations.push({
      name: {},
      key: ""
    });
  };
};
