'use strict';

/**
 * @ngInject
 */
module.exports = function ($urlMatcherFactoryProvider) {
  var validations;
  validations = [];
  return {
    defaults: {
      baseUrl: ''
    },
    defineValidation: function (validationObject) {
      var url;
      url = (validationObject.baseUrl || this.defaults.baseUrl) + validationObject.url;
      validationObject.url = $urlMatcherFactoryProvider.compile(url);
      return validations.push(validationObject);
    },
    $get: [
      '$q', '$rootScope', 'CacheFactory', function ($q, $rootScope, CacheFactory) {
        var response, responseError;
        response = function (response) {
          var $httpDefaultCache, invalidType, route, validation, _i, _j, _len, _len1, _ref;
          invalidType = function (type, data) {
            switch (type) {
              case 'array':
                return !angular.isArray(data);
              case 'object':
                return !angular.isObject(data);
              default:
                return false;
            }
          };
          for (_i = 0, _len = validations.length; _i < _len; _i++) {
            validation = validations[_i];
            if (validation.url.exec(response.config.url) && validation.method === response.config.method) {
              if (validation.status !== response.status || invalidType(validation.type, response.data)) {
                $rootScope.$emit('alert', 'danger', validation.message, response);
                $httpDefaultCache = CacheFactory.get('$http');
                _ref = $httpDefaultCache.keys();
                for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
                  route = _ref[_j];
                  if (route.indexOf(response.config.url) === 0) {
                    $httpDefaultCache.remove(route);
                  }
                }
                return $q.reject(response);
              }
            }
          }
          return response;
        };
        responseError = function (rejection) {
          $rootScope.$emit('alert', 'danger', rejection.statusText, rejection);
          return $q.reject(rejection);
        };
        return {
          response: response,
          responseError: responseError
        };
      }
    ]
  };
};
