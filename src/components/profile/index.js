'use strict';

var RoutingConfig = require('./config/Routing');

module.exports = angular.module('Mi24CCCApp.Profile', []);

angular.module('Mi24CCCApp.Profile').controller('ProfileCustomerController', require('./controller/ProfileCustomerController'));
angular.module('Mi24CCCApp.Profile').controller('ProfileBaseController', require('./controller/ProfileBaseController'));
angular.module('Mi24CCCApp.Profile').controller('ProfileUserEditDataController', require('./controller/ProfileUserEditDataController'));
angular.module('Mi24CCCApp.Profile').controller('ProfileUserEditPasswordController', require('./controller/ProfileUserEditPasswordController'));
angular.module('Mi24CCCApp.Profile').config([
  '$stateProvider', function ($stateProvider) {
    var name, stateConfig, _results;
    _results = [];
    for (name in RoutingConfig) {
      stateConfig = RoutingConfig[name];
      _results.push($stateProvider.state(name, stateConfig));
    }
    _results;
  }
]);
