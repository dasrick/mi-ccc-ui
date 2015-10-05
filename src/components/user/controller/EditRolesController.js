'use strict';

/**
 * @ngInject
 */
module.exports = function (SecurityService, User, $scope, $state, DS) {
  var currentUser, getUserRoles;
  SecurityService.getRoles().then(function (roles) {
    $scope.roles = roles;
  });
  $scope.selectedRoles = [];
  currentUser = null;
  getUserRoles = function () {
    DS.find('user', $state.params.userId, {
      bypassCache: true
    }).then(function (user) {
      currentUser = angular.copy(user);
      $scope.selectedRoles = user.roles;
    });
  };
  getUserRoles();
  $scope.$on('cache_clear_user', function () {
    getUserRoles();
  });
  $scope.toggleSelection = function (roleName, groupName) {
    var idx, role, roles, _i, _len, _ref;
    idx = $scope.selectedRoles.indexOf(roleName);
    if (idx > -1) {
      $scope.selectedRoles.splice(idx, 1);
      if ($scope.selectedRoles.length === 0) {
        $scope.selectedRoles.push('user');
      }
    } else {
      if (roleName === 'admin' && groupName === 'admin') {
        $scope.selectedRoles = [];
      }
      if (roleName.indexOf('_admin') > 0) {
        roles = [];
        _ref = $scope.selectedRoles;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          role = _ref[_i];
          if (role.indexOf("" + groupName + "_") === -1) {
            roles.push(role);
          }
        }
        $scope.selectedRoles = roles;
      }
      $scope.selectedRoles.push(roleName);
    }
  };
  $scope.inSelection = function (roleName) {
    return $scope.selectedRoles.indexOf(roleName) > -1;
  };
  $scope.isAdminChecked = function (groupName, currentRole) {
    var idx, role, _i, _len, _ref;
    idx = currentRole.indexOf('admin');
    if ($scope.selectedRoles.length === 1 && $scope.selectedRoles[0] === 'admin' && idx !== 0) {
      return true;
    }
    _ref = $scope.selectedRoles;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      role = _ref[_i];
      if (role.indexOf("" + groupName + "_") > -1 && role.indexOf('_admin') > 0 && idx === -1) {
        return true;
      }
    }
    return false;
  };
  $scope.reset = function () {
    $scope.selectedRoles = currentUser.roles;
  };
  $scope.editRoles = function () {
    User.editRoles($scope.selectedRoles, currentUser.id).then(function () {
      $state.go('^.^.list');
    });
  };
};
