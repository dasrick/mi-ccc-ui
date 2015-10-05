'use strict';

/**
 * @ngInject
 */
module.exports = function ($scope, $state, $translate, DS) {
  $scope.user = {};
  $scope.user.customer = {
    id: $state.params.customerId
  };
  $scope.reset = function () {
    $scope.user = angular.copy({});
  };
  DS.findAll('locale', {
    locale: $translate.preferredLanguage()
  });
  DS.bindAll($scope, 'locales', 'locale', {});
  $scope.$watch('user.selectedLocale', function (locale) {
    if (locale != null) {
      $scope.user.locale = locale.short;
    }
  });
  $scope.create = function () {
    var userSend;
    userSend = angular.copy($scope.user);
    userSend.baseUrl = $state.href("security.set_password", {}, {
      absolute: true
    });
    DS.create('user', userSend, {
      cacheResponse: false
    }).then(function () {
      $scope.$emit('alert', 'success', 'user.create.success');
      $state.go('^.list');
    });
  };
};
