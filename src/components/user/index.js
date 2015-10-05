'use strict';

var RoutingConfig = require('./config/Routing');
var ValidationConfig = require('./config/Validation');

module.exports = angular.module('Mi24CCCApp.User', []);

angular.module('Mi24CCCApp.User').factory('User', require('./service/User'));
angular.module('Mi24CCCApp.User').controller('User.NewController', require('./controller/NewController'));
angular.module('Mi24CCCApp.User').controller('User.ListController', require('./controller/ListController'));
angular.module('Mi24CCCApp.User').controller('User.EditRolesController', require('./controller/EditRolesController'));
angular.module('Mi24CCCApp.User').controller('User.EditDataController', require('./controller/EditDataController'));
angular.module('Mi24CCCApp.User').config(function ($stateProvider, ResponseValidatorInterceptorProvider) {
  var name, stateConfig, validation, _i, _len, _results;
  for (name in RoutingConfig) {
    stateConfig = RoutingConfig[name];
    $stateProvider.state(name, stateConfig);
  }
  _results = [];
  for (_i = 0, _len = ValidationConfig.length; _i < _len; _i++) {
    validation = ValidationConfig[_i];
    _results.push(ResponseValidatorInterceptorProvider.defineValidation(validation));
  }
});
