'use strict';

/**
 * @ngInject
 */
module.exports = function (User, Customer, $scope, $state) {
  var getList;
  getList = function () {
    Customer.getCurrentCustomer().then(function (value) {
      var customerId;
      if ($state.current.name.indexOf('global') === -1) {
        customerId = value.id;
      }
      $scope.customerId = value.id;
      User.getUsers(customerId).then(function (value) {
        $scope.userList = value;
      });
    });
  };
  getList();
  $scope.$on('cache_clear_user', function () {
    getList();
  });
  $scope.requestPassword = function (user) {
    User.requestPassword(user).then(function () {
      $scope.$emit('alert', 'info', 'user.requestpassword.success');
    });
  };
  $scope.deleteUser = function (userId, reviewer) {
    User.deleteUser(userId, reviewer).then(function () {
      $scope.$emit('alert', 'info', 'review.start_review.delete');
    });
  };
  $scope.isCurrentUser = function (id) {
    var user;
    user = User.getCurrentUser();
    if (!user) {
      return false;
    }
    return user.id === id;
  };
  $scope.currentUserHasType = function (type) {
    var user;
    user = User.getCurrentUser();
    if (!user) {
      return false;
    }
    return user.customer.type === type;
  };
  $scope.switchLock = function (user) {
    if (user.locked) {
      User.unlock(user.id).then(function () {
        user.locked = false;
      });
    } else {
      User.lock(user.id).then(function () {
        user.locked = true;
      });
    }
  };
};
