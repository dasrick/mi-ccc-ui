'use strict';

/**
 * @ngInject
 */
module.exports = function (CacheFactory, $q, $location) {
  var request, responseError;
  request = function (config) {
    var userDataCache;
    if (config.url.indexOf('/api') === 0) {
      userDataCache = CacheFactory.get('userData');
      if (userDataCache.get('token') != null) {
        config.headers.Authorization = 'Bearer ' + userDataCache.get('token');
      }
    }
    return config;
  };
  responseError = function (rejection) {
    var userDataCache;
    if (rejection.config.url.indexOf('/api') === 0 && rejection.status === 401) {
      userDataCache = CacheFactory.get('userData');
      userDataCache.removeAll();
      $location.path('/login');
    }
    return $q.reject(rejection);
  };
  return {
    request: request,
    responseError: responseError
  };
};
