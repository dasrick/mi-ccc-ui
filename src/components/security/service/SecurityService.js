'use strict';

/**
 * @ngInject
 */
module.exports = function (HttpService, $rootScope, $q) {
  var error;
  error = function (error) {
    $rootScope.$emit('alert', 'danger', error.message, error);
    return $q.reject(error);
  };
  return {
    getRoles: function () {
      var httpCall, success;
      success = function (data) {
        if (angular.isObject(data.data)) {
          return data.data;
        } else {
          data.message = 'get_roles.error.backend';
          return error(data);
        }
      };
      httpCall = {
        method: 'GET',
        url: '/api/security/roles',
        headers: {
          Accept: 'application/json'
        }
      };
      return HttpService(httpCall).then(success, error);
    }
  };
};
