'use strict';

/**
 * @ngInject
 */
module.exports = function () {
  var resources, types;
  resources = [];
  types = [];
  return {
    defaults: {
      baseUrl: ''
    },
    defineResource: function (resourceObject) {
      resourceObject.routePrefix = (resourceObject.baseUrl || this.defaults.baseUrl) + resourceObject.routePrefix;
      types.push(resourceObject.type);
      resources.push(resourceObject);
    },
    $get: [
      'CacheFactory', 'DS', function (CacheFactory, DS) {
        return {
          clear: function (type) {
            var $httpDefaultCache, resource, route, _i, _j, _len, _len1, _ref;
            for (_i = 0, _len = resources.length; _i < _len; _i++) {
              resource = resources[_i];
              if (!(type === resource.type)) {
                continue;
              }
              if (resource.useDataStore) {
                DS.ejectAll(type, {});
              }
              $httpDefaultCache = CacheFactory.get('$http');
              _ref = $httpDefaultCache.keys();
              for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
                route = _ref[_j];
                if (route.indexOf(resource.routePrefix) === 0) {
                  $httpDefaultCache.remove(route);
                }
              }
              return true;
            }
            return false;
          },
          getTypes: function () {
            return types;
          }
        };
      }
    ]
  };
};
