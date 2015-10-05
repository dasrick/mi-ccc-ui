'use strict';

var RoutingConfig = require('./config/Routing');

module.exports = angular.module('Mi24CCCApp.Log', []);

angular.module('Mi24CCCApp.Log').controller('Log.ListController', require('./controller/ListController'));
angular.module('Mi24CCCApp.Log').directive('orderFilter', require('./directive/OrderFilter'));
angular.module('Mi24CCCApp.Log').service('DeserializeLogObject', require('./service/DeserializeLogObject'));
angular.module('Mi24CCCApp.Log').config(function ($stateProvider, ResponseValidatorInterceptorProvider, $provide) {
  var name, stateConfig;
  $provide.decorator("DS", [
    "$delegate", "DeserializeLogObject", function ($delegate, DeserializeLogObject) {
      $delegate.defaults.deserialize = function (resourceName, data) {
        if (resourceName === 'log') {
          return DeserializeLogObject(data.data);
        }
        return data.data;
      };
      return $delegate;
    }
  ]);
  for (name in RoutingConfig) {
    stateConfig = RoutingConfig[name];
    $stateProvider.state(name, stateConfig);
  }
  ResponseValidatorInterceptorProvider.defineValidation({
    url: '/logs',
    method: 'GET',
    status: 200,
    message: 'get_logs.error.backend',
    type: 'array'
  });
});