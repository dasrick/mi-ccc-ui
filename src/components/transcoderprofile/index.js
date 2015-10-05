'use strict';

var RoutingConfig = require('./config/Routing');

module.exports = angular.module('Mi24CCCApp.TranscoderProfile', []);

angular.module('Mi24CCCApp.TranscoderProfile').factory('TranscoderProfileService', require('./service/Service'));
angular.module('Mi24CCCApp.TranscoderProfile').controller('TranscoderProfile.ListController', require('./controller/ListController'));
angular.module('Mi24CCCApp.TranscoderProfile').controller('TranscoderProfile.NewController', require('./controller/NewController'));
angular.module('Mi24CCCApp.TranscoderProfile').controller('TranscoderProfile.EditController', require('./controller/EditController'));
angular.module('Mi24CCCApp.TranscoderProfile').config(function ($stateProvider) {
  var name, stateConfig, _results;
  _results = [];
  for (name in RoutingConfig) {
    stateConfig = RoutingConfig[name];
    _results.push($stateProvider.state(name, stateConfig));
  }
});
