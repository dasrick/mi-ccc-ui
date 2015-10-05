'use strict';

var RoutingConfig = require('./config/Routing');

module.exports = angular.module('Mi24CCCApp.Security', []);
angular.module('Mi24CCCApp.Security').controller('SecuritySetPasswordController', require('./controller/SecuritySetPasswordController'));
angular.module('Mi24CCCApp.Security').controller('SecurityRequestPasswordController', require('./controller/SecurityRequestPasswordController'));
angular.module('Mi24CCCApp.Security').controller('SecurityLoginController', require('./controller/SecurityLoginController'));
angular.module('Mi24CCCApp.Security').factory('AuthInterceptor', require('./service/AuthInterceptor'));
angular.module('Mi24CCCApp.Security').factory('Permission', require('./service/Permission'));
angular.module('Mi24CCCApp.Security').factory('SecurityService', require('./service/SecurityService'));
angular.module('Mi24CCCApp.Security').directive('hasRole', require('./directive/HasRole'));
angular.module('Mi24CCCApp.Security').directive('hasType', require('./directive/HasType'));
angular.module('Mi24CCCApp.Security').directive('hideLogin', require('./directive/HideLogin'));
angular.module('Mi24CCCApp.Security').config(
  function ($stateProvider, $httpProvider, $urlRouterProvider, ResponseValidatorInterceptorProvider) {
    var name, stateConfig, _results;
    $urlRouterProvider.otherwise(function ($injector) {
      var $state, User, user;
      User = $injector.get('User');
      user = User.getCurrentUser();
      $state = $injector.get('$state');
      if (user) {
        $state.go('base.dashboard-default', {
          customerId: user.customer.id
        });
      } else {
        $state.go('security.login');
      }
    });
    $httpProvider.interceptors.push('AuthInterceptor');
    ResponseValidatorInterceptorProvider.defineValidation({
      url: '/security/reset-password/{token}',
      method: 'POST',
      status: 204,
      message: 'error.backend.new_password'
    });
    _results = [];
    for (name in RoutingConfig) {
      stateConfig = RoutingConfig[name];
      _results.push($stateProvider.state(name, stateConfig));
    }
    _results;
  });
angular.module('Mi24CCCApp.Security').run(function ($rootScope, $state, CacheFactory, User) {
  var userDataCache;
  userDataCache = CacheFactory.get('userData');
  $rootScope.$on('$stateChangeStart', function (e, to) {
    var user;
    if (to.name !== 'security.login' && to.name !== 'security.set_password' && to.name !== 'security.request_password' && (userDataCache.get('token') == null)) {
      e.preventDefault();
      $state.go('security.login', {});
    }
    if (to.name === 'security.login' && (userDataCache.get('token') != null)) {
      e.preventDefault();
      user = User.getCurrentUser();
      $state.go('base.dashboard-default', {
        customerId: user.customer.id
      });
    }
  });
});