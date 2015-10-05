'use strict';

/**
 * @ngInject
 */
module.exports = function ($scope, $modalInstance, draft, current, type, DiffMapper, $translate, DS) {
  var params;
  $scope.draft = draft;
  $scope.current = current;
  $scope.type = type;
  switch (type) {
    case 'product':
      $scope.locale = $translate.preferredLanguage();
      params = {
        locale: $scope.locale
      };
      DS.findAll('locale', params);
      $scope.$watch(function () {
        return DS.lastModified('locale');
      }, function () {
        var locale, _i, _len, _ref, _results;
        $scope.locales = {};
        if (DS.filter('locale', {}).length > 0) {
          _ref = DS.filter('locale', {});
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            locale = _ref[_i];
            _results.push($scope.locales[locale.short] = locale.name);
          }
          _results;
        }
      });
      $scope.templateUrl = 'views/review/diff_product.html';
      break;
    case 'plan':
      $scope.templateUrl = 'views/review/diff_plan.html';
  }
  $scope.delta = DiffMapper(current, draft);
  $scope.close = function () {
    $modalInstance.close();
  };
};
