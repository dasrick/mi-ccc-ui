'use strict';

/**
 * @ngInject
 */
module.exports = function (HttpService, $state, $rootScope, $q, CacheFactory) {
  var error;
  error = function (error) {
    $rootScope.$emit('alert', 'danger', error.message, error);
    return $q.reject(error);
  };
  return {
    getCurrentUser: function () {
      var userDataCache;
      userDataCache = CacheFactory.get('userData');
      if ((userDataCache.get('user') != null) && (userDataCache.get('token') != null)) {
        return userDataCache.get('user');
      }
    },
    getUsers: function (customerId) {
      var httpCall, params, success;
      if (customerId == null) {
        customerId = null;
      }
      success = function (data) {
        if (angular.isArray(data.data)) {
          return data.data;
        } else {
          data.message = 'get_users.error.backend';
          return error(data);
        }
      };
      params = {};
      if (customerId != null) {
        params.customer = customerId;
      }
      httpCall = {
        method: 'GET',
        url: '/api/users',
        cache: true,
        params: params,
        headers: {
          Accept: 'application/json'
        }
      };
      return HttpService(httpCall).then(success, error);
    },
    deleteUser: function (userId, reviewer) {
      var httpCall, success;
      success = function (data) {
        if (data.status === 204) {
          return true;
        } else {
          data.message = 'user.delete.error.backend';
          return error(data);
        }
      };
      httpCall = {
        method: 'PUT',
        url: "/api/users/" + userId + "/review",
        headers: {
          Accept: 'application/json'
        },
        data: {
          reviewer: reviewer,
          baseUrl: $state.href("profile.reviews.detail", {}, {
            absolute: true
          })
        }
      };
      return HttpService(httpCall).then(success, error);
    },
    requestPassword: function (email) {
      var httpCall;
      httpCall = {
        method: 'PUT',
        url: '/api/security/request-password/' + encodeURIComponent(email),
        headers: {
          Accept: 'application/json'
        },
        data: {
          baseUrl: $state.href("security.set_password", {}, {
            absolute: true
          })
        }
      };
      return HttpService(httpCall);
    },
    editRoles: function (roles, userId) {
      var httpCall;
      httpCall = {
        method: 'PUT',
        url: "/api/users/" + userId + "/roles",
        headers: {
          Accept: 'application/json'
        },
        data: {
          id: userId,
          roles: roles
        }
      };
      return HttpService(httpCall);
    },
    lock: function (userId) {
      var httpCall, success;
      success = function (data) {
        if (data.status === 204) {
          return true;
        } else {
          data.message = 'user.lock.error.backend';
          return error(data);
        }
      };
      httpCall = {
        method: 'PUT',
        url: "/api/users/" + userId + "/lock",
        headers: {
          Accept: 'application/json'
        }
      };
      return HttpService(httpCall).then(success, error);
    },
    unlock: function (userId) {
      var httpCall, success;
      success = function (data) {
        if (data.status === 204) {
          return true;
        } else {
          data.message = 'user.unlock.error.backend';
          return error(data);
        }
      };
      httpCall = {
        method: 'PUT',
        url: "/api/users/" + userId + "/unlock",
        headers: {
          Accept: 'application/json'
        }
      };
      return HttpService(httpCall).then(success, error);
    },
    setPassword: function (passwords) {
      var httpCall, success;
      success = function (data) {
        if (data.status === 204) {
          return true;
        } else {
          data.message = 'user.set_password.error.backend';
          return error(data);
        }
      };
      httpCall = {
        method: 'PUT',
        url: "/api/profile/password",
        headers: {
          Accept: 'application/json'
        },
        data: passwords
      };
      return HttpService(httpCall).then(success, error);
    },
    editData: function (user) {
      var httpCall, success;
      success = function (data) {
        if (data.status === 204) {
          return true;
        } else {
          data.message = 'user.update.error.backend';
          return error(data);
        }
      };
      httpCall = {
        method: 'PUT',
        url: '/api/profile/data',
        data: user,
        headers: {
          Accept: 'application/json'
        }
      };
      return HttpService(httpCall).then(success, error);
    },
    getProfile: function () {
      var httpCall, success;
      success = function (data) {
        if (angular.isObject(data.data)) {
          return data.data;
        } else {
          data.message = 'profile.get.error.backend';
          return error(data);
        }
      };
      httpCall = {
        method: 'GET',
        cache: false,
        url: '/api/profile',
        headers: {
          Accept: 'application/json'
        }
      };
      return HttpService(httpCall).then(success, error);
    }
  };
};
