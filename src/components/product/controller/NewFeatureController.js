'use strict';

/**
 * @ngInject
 */
module.exports = function ($scope, DS, PRODUCT_TYPES, AVAILABLE_LANGUAGES, $translate, $state) {
  $scope.feature = {};
  $scope.language = $translate.use();
  $scope.PRODUCT_TYPES = PRODUCT_TYPES;
  $scope.AVAILABLE_LANGUAGES = AVAILABLE_LANGUAGES;
  $scope.reset = function () {
    var feature, lang, name;
    name = {};
    for (lang in $scope.feature.name) {
      name[lang] = '';
    }
    feature = {
      name: name
    };
    $scope.feature = feature;
  };
  $scope.create = function () {
    DS.create('feature', $scope.feature, {
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
