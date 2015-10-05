'use strict';

/**
 * @ngInject
 */
module.exports = function (Customer, $translate, $scope, $state, DS) {
  $scope.customer = {};
  DS.findAll('country', {
    locale: $translate.preferredLanguage()
  });
  DS.bindAll($scope, 'countries', 'country', {});
  $scope.$watch('customer.selectedCountry', function (country) {
    if (country != null) {
      if ($scope.customer.address == null) {
        $scope.customer.address = {};
      }
      $scope.customer.address.country = country.short;
    }
  });
  Customer.getCurrentCustomer().then(function (value) {
    $scope.types = ['consumer'];
    $scope.customer.type = 'consumer';
    if (value.type === 'admin') {
      $scope.types.push('partner');
    }
    $scope.save = function () {
      $scope.customer.parent = {
        id: value.id
      };
      delete $scope.customer.selectedCountry;
      Customer.createCustomer($scope.customer).then(function () {
        $state.go('^.list');
      });
    };
  });
};
