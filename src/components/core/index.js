'use strict';

var angular = require('angular');
var
  RoutingConfig = require('./config/Routing'),
  CacheClearResourceConfig = require('./config/CacheClearResource'),
  ResourceConfig = require('./config/Resource');

module.exports = angular.module('core', [])

  .factory('HttpService', require('./service/HttpService'))
  .factory('StompService', require('./service/StompService'))

  .provider('ResponseValidatorInterceptor', require('./service/ResponseValidatorInterceptor'))
  .provider('CacheClearService', require('./service/CacheClearService'))

  .directive('isInBaseState', require('./directive/IsInBaseState'))
  .directive('translateModel', require('./directive/TranslateModel'))
  .directive('dropdownToggle', require('./directive/DropdownToggle'))

  .controller('CommonBaseController', require('./controller/CommonBaseController'))
  .controller('CommonAlertController', require('./controller/CommonAlertController'))
  .controller('CommonCacheClearController', require('./controller/CommonCacheClearController'))

  .filter('translateModel', require('./filter/TranslateModel'))

  //.config(function ($stateProvider, DSProvider, $provide, $httpProvider, ResponseValidatorInterceptorProvider, CacheClearServiceProvider) {
  //  var name, resource, stateConfig, _i, _len;
  //  $provide.decorator("dropdownToggleDirective", [
  //    "$delegate", function ($delegate) {
  //      $delegate.shift();
  //      return $delegate;
  //    }
  //  ]);
  //  for (name in RoutingConfig) {
  //    stateConfig = RoutingConfig[name];
  //    $stateProvider.state(name, stateConfig);
  //  }
  //  CacheClearServiceProvider.defaults.baseUrl = '/api';
  //  for (_i = 0, _len = CacheClearResourceConfig.length; _i < _len; _i++) {
  //    resource = CacheClearResourceConfig[_i];
  //    CacheClearServiceProvider.defineResource(resource);
  //  }
  //  $httpProvider.interceptors.push('ResponseValidatorInterceptor');
  //  DSProvider.defaults.baseUrl = '/api';
  //  ResponseValidatorInterceptorProvider.defaults.baseUrl = '/api';
  //})
  //
  //.run(function ($http, CacheFactory, DS) {
  //  var options, resource, _i, _len, _results;
  //  options = {
  //    maxAge: 900000,
  //    cacheFlushInterval: 6000000,
  //    deleteOnExpire: 'aggressive'
  //  };
  //  CacheFactory('$http', options);
  //  $http.defaults.cache = CacheFactory.get('$http');
  //  CacheFactory('userData', {
  //    storageMode: 'sessionStorage'
  //  });
  //  _results = [];
  //  for (_i = 0, _len = ResourceConfig.length; _i < _len; _i++) {
  //    resource = ResourceConfig[_i];
  //    _results.push(DS.defineResource(resource));
  //  }
  //  _results;
  //})

  .config(function ($stateProvider, $translatePartialLoaderProvider) {
    angular.forEach(RoutingConfig, function (config, name) {
      $stateProvider.state(name, config);
    });
    $translatePartialLoaderProvider.addPart('core');
  })
;
