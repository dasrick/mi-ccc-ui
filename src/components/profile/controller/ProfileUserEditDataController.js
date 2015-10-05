'use strict';

/**
 * @ngInject
 */
module.exports = function (User, $scope, $translate, DS) {
  $scope.user = User.getCurrentUser();
  $scope.selectedLocale = $scope.user.locale;
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
    User.editData(formUser).then(function () {
      $scope.$emit('alert', 'success', 'user.data.update');
    });
  };
};
