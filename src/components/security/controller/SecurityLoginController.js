'use strict';

/**
 * @ngInject
 */
module.exports = function(HttpService, $scope, CacheFactory, $state, User) {
        var updateUser, userDataCache;
        userDataCache = CacheFactory.get('userData');
        $scope.isLoggedIn = function() {
          return userDataCache.get('token') != null;
        };
        $scope.reviewCount = function() {
          if ($scope.isLoggedIn()) {
            return User.getCurrentUser().reviewCount;
          }
          return 0;
        };
        $scope.logout = function() {
          userDataCache.removeAll();
          $state.go('security.login');
        };
        updateUser = function() {
          $scope.$on(User.getCurrentUser().id, function() {
            User.getProfile().then(function(updatedUser) {
              userDataCache.put('user', updatedUser);
              $state.transitionTo($state.current, $state.params, {
                reload: true,
                inherit: false,
                notify: true
              });
            });
          });
        };
        if ($scope.isLoggedIn()) {
          updateUser();
        }
        $scope.login = function(form) {
          var error, httpCall, success;
          error = function(error) {
            if (error.status === 401 && error.headers('mi24-reason') === 'locked') {
              $scope.$emit('alert', 'warning', 'security.alert.user_locked');
            }
          };
          success = function(data) {
            var payload, user;
            if (data.status === 200) {
              userDataCache.put('token', data.data.token);
              payload = JSON.parse(atob(data.data.token.split('.')[1]));
              user = JSON.parse(payload.user);
              userDataCache.put('user', JSON.parse(payload.user));
              userDataCache.put('stomp', payload.stomp);
              updateUser();
              $state.go('base.dashboard-default', {
                customerId: user.customer.id
              });
            } else {
              data.message = 'error.backend.login';
              return error(data);
            }
          };
          httpCall = {
            method: 'POST',
            url: "/api/security/login",
            headers: {
              Accept: 'application/json'
            },
            data: form
          };
          return HttpService(httpCall).then(success, error);
        };
        $scope.getCustomerType = function() {
          var user;
          user = User.getCurrentUser();
          if (user) {
            return user.customer.type;
          }
        };
      };
