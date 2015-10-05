'use strict';

var RoutingConfig = require('./config/Routing');

module.exports = angular.module('Mi24CCCApp.PlayerSkin', []);

angular.module('Mi24CCCApp.PlayerSkin').controller('PlayerSkin.ListController', require('./controller/ListController'));
angular.module('Mi24CCCApp.PlayerSkin').controller('PlayerSkin.NewController', require('./controller/NewController'));
angular.module('Mi24CCCApp.PlayerSkin').factory('PlayerSkinService', require('./service/Service'));
angular.module('Mi24CCCApp.PlayerSkin').directive('resetListener', require('./directive/ResetListener'));
angular.module('Mi24CCCApp.PlayerSkin').config([
  '$stateProvider', function ($stateProvider) {
    var name, stateConfig, _results;
    _results = [];
    for (name in RoutingConfig) {
      stateConfig = RoutingConfig[name];
      _results.push($stateProvider.state(name, stateConfig));
    }
    return _results;
  }
]);
