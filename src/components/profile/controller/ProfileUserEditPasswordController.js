'use strict';

/**
 * @ngInject
 */
module.exports = function (User, $scope) {
  $scope.setPassword = function () {
    User.setPassword($scope.password).then(function () {
      $scope.$emit('alert', 'success', 'user.password.update');
    });
  };
};
