'use strict';

/**
 * @ngInject
 */
module.exports = function (Customer, $scope, $state) {
  Customer.getCurrentCustomer().then(function (value) {
    var getCustomer, parentId;
    if ($state.current.name.indexOf('global') === -1) {
      parentId = value.id;
    }
    $scope.customerId = value.id;
    getCustomer = function () {
      Customer.getCustomers(parentId).then(function (value) {
        $scope.customerList = value;
      });
    };
    $scope.$on('cache_clear_customer', function () {
      getCustomer();
    });
    getCustomer();
  });
  $scope.deleteCustomer = function (customerId, reviewer) {
    Customer.deleteCustomer(customerId, reviewer).then(function () {
      $scope.$emit('alert', 'info', 'review.start_review.delete');
    });
  };
};
