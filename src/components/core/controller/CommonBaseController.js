'use strict';

/**
 * @ngInject
 */
module.exports = function ($scope, $state, Customer, User, $rootScope, CacheFactory) {
  var getCustomers, setCurrentCustomer;
  getCustomers = function () {
    Customer.getCustomers().then(function (value) {
      $scope.customer = value;
    });
  };
  setCurrentCustomer = function () {
    Customer.getCurrentCustomer().then(function (value) {
      $scope.singleCustomer = value;
      $scope.singleCustomer.selected = value;
    });
  };
  $scope.$on('cache_clear_customer', function () {
    getCustomers();
    setCurrentCustomer();
  });
  getCustomers();
  $scope.currentUser = User.getCurrentUser();
  $rootScope.$on('$stateChangeStart', function (e, toState, toParams, fromState, fromParams) {
    var userDataCache;
    if (((toParams.customerId == null) || toParams.customerId === '') && ((fromParams.customerId != null) && fromParams.customerId !== '')) {
      userDataCache = CacheFactory.get('userData');
      userDataCache.put('customerId', fromParams.customerId);
      toParams.customerId = fromParams.customerId;
    }
  });
  $scope.$watch('singleCustomer.selected', function (customer) {
    if ((customer != null) && $scope.singleCustomer.id !== customer.id) {
      $scope.singleCustomer = customer;
      $scope.singleCustomer.selected = customer;
      $state.go('base.dashboard', {
        customerId: $scope.singleCustomer.id
      });
    }
  });
  setCurrentCustomer();
};
