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
    all: function () {
      var httpCall, success;
      success = function (data) {
        if (data.status === 200 && angular.isObject(data.data)) {
          return data.data;
        } else {
          data.message = 'all_review.error.backend';
          return error(data);
        }
      };
      httpCall = {
        method: 'GET',
        url: '/api/review',
        headers: {
          Accept: 'application/json'
        }
      };
      return HttpService(httpCall).then(success, error);
    },
    getReview: function (token) {
      var httpCall, success;
      success = function (data) {
        if (data.status === 200) {
          return data.data;
        } else {
          data.message = 'get_review.error.backend';
          return error(data);
        }
      };
      httpCall = {
        method: 'GET',
        url: '/api/review/' + token,
        headers: {
          Accept: 'application/json'
        }
      };
      return HttpService(httpCall).then(success, error);
    },
    allow: function (token) {
      var httpCall, success;
      success = function (data) {
        if (data.status === 204) {
          return true;
        } else {
          data.message = 'allow_review.error.backend';
          return error(data);
        }
      };
      httpCall = {
        method: 'PUT',
        url: "/api/review/" + token + "/allow",
        headers: {
          Accept: 'application/json'
        },
        data: {}
      };
      return HttpService(httpCall).then(success, error);
    },
    deny: function (token) {
      var httpCall, success;
      success = function (data) {
        if (data.status === 204) {
          return true;
        } else {
          data.message = 'deny_review.error.backend';
          return error(data);
        }
      };
      httpCall = {
        method: 'PUT',
        url: "/api/review/" + token + "/deny",
        headers: {
          Accept: 'application/json'
        },
        data: {}
      };
      return HttpService(httpCall).then(success, error);
    }
  };
};
