'use strict';

/**
 * @ngInject
 */
module.exports = function (User, $scope, $state) {
  $scope.requestPassword = function (email) {
    User.requestPassword(email).then(function () {
      $scope.$emit('alert', 'success', 'security.requestpassword.success');
      $state.go('^.login');
    });
  };
};
