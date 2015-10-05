'use strict';

var RoutingConfig = require('./config/Routing');

module.exports = angular.module('Mi24CCCApp.Plan', []);

angular.module('Mi24CCCApp.Plan').factory('PlanService', require('./service/PlanService'));
angular.module('Mi24CCCApp.Plan').controller('PlanNewController', require('./controller/PlanNewController'));
angular.module('Mi24CCCApp.Plan').controller('PlanEditController', require('./controller/PlanEditController'));
angular.module('Mi24CCCApp.Plan').controller('PlanListController', require('./controller/PlanListController'));
angular.module('Mi24CCCApp.Plan').constant('PLAN_UNITS', {
  mb: 'MB',
  gb: 'GB',
  tb: 'TB',
  pb: 'PB'
});
angular.module('Mi24CCCApp.Plan').config(function ($stateProvider) {
  var name, stateConfig, _results;
  _results = [];
  for (name in RoutingConfig) {
    stateConfig = RoutingConfig[name];
    _results.push($stateProvider.state(name, stateConfig));
  }
  _results;
});
