'use strict';

/**
 * @ngInject
 */
module.exports = function (HttpService, $state, $rootScope, $q) {

  var apiUrl = '/api/vmproinstance';

  var error;
  error = function (error) {
    $rootScope.$emit('alert', 'danger', error.message, error);
    return $q.reject(error);
  };

  return {
    get: function (vmproInstanceId) {
      var httpCall, success;
      success = function (data) {
        if (data.status === 200 && angular.isObject(data.data)) {
          return data.data;
        } else {
          data.message = 'vmproinstance.get.error.backend';
          return error(data);
        }
      };
      httpCall = {
        method: 'GET',
        url: apiUrl + '/' + vmproInstanceId,
        headers: {
          Accept: 'application/json'
        }
      };
      return HttpService(httpCall).then(success, error);
    },

    all: function (type) {
      var httpCall, success;
      success = function (data) {
        if (data.status === 200 && angular.isObject(data.data)) {
          return data.data;
        } else {
          data.message = 'vmproinstance.all.error.backend';
          return error(data);
        }
      };
      var typeQuery = '';
      if (type && type !== '') {
        typeQuery = '?type=' + type;
      }
      httpCall = {
        cache: false,
        method: 'GET',
        url: apiUrl + typeQuery,
        headers: {
          Accept: 'application/json'
        }
      };
      return HttpService(httpCall).then(success, error);
    },

    create: function (vmproInstance) {
      var httpCall, success;
      success = function (data) {
        if (data.status === 201) {
          return true;
        } else {
          data.message = 'vmproinstance.create.error.backend';
          return error(data);
        }
      };
      httpCall = {
        method: 'POST',
        url: apiUrl,
        headers: {
          Accept: 'application/json'
        },
        data: vmproInstance
      };
      return HttpService(httpCall).then(success, error);
    },

    update: function (vmproInstance, reviewer) {
      var httpCall, success, data;
      success = function (data) {
        if (data.status === 204) {
          return true;
        } else {
          data.message = 'vmproinstance.update.error.backend';
          return error(data);
        }
      };
      data = {
        vmproInstance: vmproInstance,
        review: {
          reviewer: reviewer,
          baseUrl: $state.href('profile.reviews.detail', {}, {
            absolute: true
          })
        }
      };
      httpCall = {
        method: 'PUT',
        url: apiUrl + '/' + vmproInstance.id,
        data: data,
        headers: {
          Accept: 'application/json'
        }
      };
      return HttpService(httpCall).then(success, error);
    },

    deactivate: function (vmproInstanceId, reviewer) {
      var httpCall, success;
      success = function (data) {
        if (data.status === 204) {
          return true;
        } else {
          data.message = 'vmproinstance.deactivate.error.backend';
          return error(data);
        }
      };
      httpCall = {
        method: 'PUT',
        url: apiUrl + '/' + vmproInstanceId + '/deactivate',
        headers: {
          Accept: 'application/json'
        },
        data: {
          reviewer: reviewer,
          baseUrl: $state.href('profile.reviews.detail', {}, {
            absolute: true
          })
        }
      };
      return HttpService(httpCall).then(success, error);
    },

    delete: function (vmproInstanceId) {
      var httpCall, success;
      success = function (data) {
        if (data.status === 204) {
          return true;
        } else {
          data.message = 'vmproinstance.delete.error.backend';
          return error(data);
        }
      };
      httpCall = {
        method: 'DELETE',
        url: apiUrl + '/' + vmproInstanceId,
        headers: {
          Accept: 'application/json'
        }
      };
      return HttpService(httpCall).then(success, error);
    }
  };
};
