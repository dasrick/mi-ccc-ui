'use strict';

/**
 * @ngInject
 */
module.exports = function ($translate, $scope, $state, DS) {
  var getUserDetails;
  getUserDetails = function () {
    DS.find('user', $state.params.userId, {
      bypassCache: true
    }).then(function (value) {
      $scope.user = value;
      DS.findAll('locale', {
        locale: $translate.preferredLanguage()
      });
      $scope.$watch(function () {
        return DS.lastModified('locale');
      }, function () {
        var locale;
        $scope.locales = DS.filter('locale', {});
        locale = DS.get('locale', $scope.user.locale);
        if (locale != null) {
          $scope.selectedLocale = locale.name;
        }
      });
    });
  };
  getUserDetails();
  $scope.$on('cache_clear_user', function () {
    getUserDetails();
  });
  $scope.localeSelect = function (locale) {
    $scope.user.locale = locale.short;
  };
  $scope.save = function () {
    var formUser;
    formUser = {};
    formUser.id = $scope.user.id;
    formUser.firstName = $scope.user.firstName;
    formUser.lastName = $scope.user.lastName;
    formUser.locale = $scope.user.locale;
    DS.update('user', formUser.id, formUser, {
      cacheResponse: false
    }).then(function () {
      $state.go('^.^.list');
    });
  };
};
