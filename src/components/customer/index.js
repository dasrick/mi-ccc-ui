'use strict';

var angular = require('angular');
var RoutingConfig = require('./config/Routing');

module.exports = angular.module('Mi24CCCApp.Customer', []);

angular.module('Mi24CCCApp.Customer').controller('Customer.ListController', require('./controller/ListController'));
angular.module('Mi24CCCApp.Customer').controller('Customer.NewController', require('./controller/NewController'));
angular.module('Mi24CCCApp.Customer').controller('Customer.EditController', require('./controller/EditController'));
angular.module('Mi24CCCApp.Customer').factory('Customer', require('./service/Customer'));
angular.module('Mi24CCCApp.Customer').config(function ($stateProvider) {
  var name, stateConfig, _results;
  _results = [];
  for (name in RoutingConfig) {
    stateConfig = RoutingConfig[name];
    _results.push($stateProvider.state(name, stateConfig));
  }
  _results;
}).run(function ($rootScope, $state) {
  $rootScope.$on('$stateChangeStart', function (e, to) {
    var redirectCustomer;
    if (to.name.indexOf('base.customermanagement') !== -1) {
      redirectCustomer = function () {
        if ($rootScope.singleCustomer.type !== 'admin' && $rootScope.singleCustomer.type !== 'partner') {
          $state.go('base.dashboard', {});
        }
      };
      if ($rootScope.singleCustomer == null) {
        $rootScope.$watch('singleCustomer', function (newValue, oldValue) {
          if ((oldValue == null) && (newValue != null)) {
            redirectCustomer();
          }
        });
      } else {
        redirectCustomer();
      }
    }
  });
});
