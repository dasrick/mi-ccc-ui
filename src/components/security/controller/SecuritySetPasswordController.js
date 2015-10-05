'use strict';

/**
 * @ngInject
 */
module.exports = function (HttpService, $scope, $state) {
  $scope.setPassword = function () {
    var httpCall;
    httpCall = {
      method: 'POST',
      url: "/api/security/reset-password/" + $state.params.token,
      headers: {
        Accept: 'application/json'
      },
      data: $scope.password
    };
    HttpService(httpCall).then(function () {
      $scope.$emit('alert', 'success', 'success.security.new_password');
      $state.go('^.login');
    });
  };
};
