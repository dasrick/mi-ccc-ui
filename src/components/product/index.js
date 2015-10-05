'use strict';

var RoutingConfig = require('./config/Routing');

module.exports = angular.module('Mi24CCCApp.Product', []);

angular.module('Mi24CCCApp.Product').factory('ProductService', require('./service/ProductService'));
angular.module('Mi24CCCApp.Product').controller('Product.ListController', require('./controller/ListController'));
angular.module('Mi24CCCApp.Product').controller('Product.NewProductController', require('./controller/NewProductController'));
angular.module('Mi24CCCApp.Product').controller('Product.EditProductController', require('./controller/EditProductController'));
angular.module('Mi24CCCApp.Product').controller('Product.NewFeatureController', require('./controller/NewFeatureController'));
angular.module('Mi24CCCApp.Product').controller('Product.EditFeatureController', require('./controller/EditFeatureController'));
angular.module('Mi24CCCApp.Product').controller('Product.AssignmentController', require('./controller/EditFeatureController'));
angular.module('Mi24CCCApp.Product').constant('PRODUCT_TYPES', {
  1: 'product.type.vm_pro'
});
angular.module('Mi24CCCApp.Product').config([
  '$stateProvider', function ($stateProvider) {
    for (var name in RoutingConfig) {
      var stateConfig = RoutingConfig[name];
      $stateProvider.state(name, stateConfig);
    }
  }
]);
