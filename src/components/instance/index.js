'use strict';

var RoutingConfig = require('./config/Routing');

module.exports = angular.module('Mi24CCCApp.Instance', []);

angular.module('Mi24CCCApp.Instance').service('VmproInstanceService', require('./service/VmproInstanceService'));
angular.module('Mi24CCCApp.Instance').controller('Instance.ListController', require('./controller/ListController'));
angular.module('Mi24CCCApp.Instance').controller('Instance.NewController', require('./controller/NewController'));
angular.module('Mi24CCCApp.Instance').controller('Instance.EditController', require('./controller/EditController'));
angular.module('Mi24CCCApp.Instance').config(function ($stateProvider) {
  var name, stateConfig, _results;
  _results = [];
  for (name in RoutingConfig) {
    stateConfig = RoutingConfig[name];
    _results.push($stateProvider.state(name, stateConfig));
  }
});
