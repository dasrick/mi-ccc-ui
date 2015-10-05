'use strict';

var RoutingConfig = require('./config/Routing');

module.exports = angular.module('Mi24CCCApp.Assignment', []);

angular.module('Mi24CCCApp.Assignment').controller('Assignment.AssignController', require('./controller/AssignController'));
angular.module('Mi24CCCApp.Assignment').controller('Assignment.ListController', require('./controller/ListController'));
angular.module('Mi24CCCApp.Assignment').controller('Assignment.DetailController', require('./controller/DetailController'));
angular.module('Mi24CCCApp.Assignment').controller('Assignment.DetailFeaturesController', require('./controller/DetailFeaturesController'));
angular.module('Mi24CCCApp.Assignment').controller('Assignment.ReactivateController', require('./controller/ReactivateController'));
angular.module('Mi24CCCApp.Assignment').controller('Assignment.DetailPlansController', require('./controller/DetailPlansController'));
angular.module('Mi24CCCApp.Assignment').controller('Assignment.DetailPlayoutScriptController', require('./controller/DetailPlayoutScriptController'));
angular.module('Mi24CCCApp.Assignment').controller('Assignment.RenewController', require('./controller/RenewController'));
angular.module('Mi24CCCApp.Assignment').controller('Assignment.DetailPlayerSkinsController', require('./controller/DetailPlayerSkinsController'));
angular.module('Mi24CCCApp.Assignment').controller('Assignment.DetailTranscoderProfilesController', require('./controller/DetailTranscoderProfilesController'));
angular.module('Mi24CCCApp.Assignment').filter('assignmentFilter', require('./filter/Assignment'));
angular.module('Mi24CCCApp.Assignment').filter('nameFilter', require('./filter/Name'));
angular.module('Mi24CCCApp.Assignment').service('Assignment', require('./service/Assignment'));
angular.module('Mi24CCCApp.Assignment').service('Duration', require('./service/Duration'));
angular.module('Mi24CCCApp.Assignment').factory('PlayoutScript', require('./service/PlayoutScript'));
angular.module('Mi24CCCApp.Assignment').directive('duration', require('./directive/Duration'));
angular.module('Mi24CCCApp.Assignment').config(function ($stateProvider, ResponseValidatorInterceptorProvider, $provide) {
  var name, stateConfig;
  $provide.decorator("ngModelDirective", [
    "$delegate", function ($delegate) {
      var controller, ngModel;
      ngModel = $delegate[0];
      controller = ngModel.controller;
      ngModel.controller = [
        "$scope", "$element", "$attrs", "$injector", function (scope, element, attrs, $injector) {
          var $interpolate;
          $interpolate = $injector.get("$interpolate");
          attrs.$set("name", $interpolate(attrs.name || "")(scope));
          return $injector.invoke(controller, this, {
            $scope: scope,
            $element: element,
            $attrs: attrs
          });
        }
      ];
      return $delegate;
    }
  ]);
  $provide.decorator("formDirective", [
    "$delegate", function ($delegate) {
      var controller, form;
      form = $delegate[0];
      controller = form.controller;
      form.controller = [
        "$scope", "$element", "$attrs", "$injector", function (scope, element, attrs, $injector) {
          var $interpolate;
          $interpolate = $injector.get("$interpolate");
          attrs.$set("name", $interpolate(attrs.name || attrs.ngForm || "")(scope));
          return $injector.invoke(controller, this, {
            $scope: scope,
            $element: element,
            $attrs: attrs
          });
        }
      ];
      return $delegate;
    }
  ]);
  for (name in RoutingConfig) {
    stateConfig = RoutingConfig[name];
    $stateProvider.state(name, stateConfig);
  }
  ResponseValidatorInterceptorProvider.defineValidation({
    url: '/assignments/{assignmentId:[0-9a-zA-Z]{1,}}/additional/feature',
    method: 'POST',
    status: 201,
    message: 'assignment.add_feature.error.backend'
  });
  ResponseValidatorInterceptorProvider.defineValidation({
    url: '/assignments/{assignmentId:[0-9a-zA-Z]{24}}/playout-script',
    method: 'PUT',
    status: 204,
    message: 'assignment.change_playout_script.error.backend'
  });
});
