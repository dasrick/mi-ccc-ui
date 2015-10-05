'use strict';

var RoutingConfig = require('./config/Routing');

module.exports = angular.module('Mi24CCCApp.Review', []);

angular.module('Mi24CCCApp.Review').directive('reviewableAction', require('./directive/ReviewableAction'));
angular.module('Mi24CCCApp.Review').controller('ReviewModalController', require('./controller/ReviewModalController'));
angular.module('Mi24CCCApp.Review').controller('ReviewController', require('./controller/ReviewController'));
angular.module('Mi24CCCApp.Review').controller('ReviewListController', require('./controller/ReviewListController'));
angular.module('Mi24CCCApp.Review').controller('ReviewChangesController', require('./controller/ReviewChangesController'));
angular.module('Mi24CCCApp.Review').factory('ReviewService', require('./service/ReviewService'));
angular.module('Mi24CCCApp.Review').service('DiffMapper', require('./service/DiffMapper'));
angular.module('Mi24CCCApp.Review').config(function ($stateProvider, ResponseValidatorInterceptorProvider) {
  var name, stateConfig;
  for (name in RoutingConfig) {
    stateConfig = RoutingConfig[name];
    $stateProvider.state(name, stateConfig);
  }
  ResponseValidatorInterceptorProvider.defineValidation({
    url: '/reviewers',
    method: 'GET',
    status: 200,
    type: 'array',
    message: 'get_reviewers.error.backend'
  });
});
